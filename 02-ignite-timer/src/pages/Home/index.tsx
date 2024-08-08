import { HandPalm, Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { differenceInSeconds } from "date-fns";
import { useEffect, useState } from "react";
import {
  HomeContainer,
  FormContainer,
  CountdownContainer,
  Separator,
  StartCountdownButton,
  StopCountdownButton,
  TaskInput,
  MinutesAmountInput,
} from "./styles";

//montagem do esquema de validação do zod e relativamente simples conforme abaixo
//e bom criar um esquema para depois adiciona-lo a fonfiguraçã do zod (linhas 24/26)
const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a Tarefa"),
  minutesAmount: zod
    .number()
    .min(1, "O ciclo precisa ser de no mínimo 05 minutos")
    .max(60, "O ciclo precisa ser de no máximo 60 minutos"),
});

// interface criada para da forma de objeto aos dados recuperados dos inputs do formulário
// interface NewCycleFormData {
//   task: string;
//   minutesAmount: number;
// }

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

//o zod pode inferir qual o tipo e estrutura dos objetos apartir do schema
// como typescript não entende bem variáveis javascript, e necessário usar o type of para o typescript reconhecer ela
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
  // função Register adiciona inputs ao formulario e HandleSubmit
  // a função reset indicada na desestruturação, ela volta o valor dos campos para o valor original definido em defaultValues
  const { register, handleSubmit, watch, formState, reset } =
    useForm<NewCycleFormData>({
      resolver: zodResolver(newCycleFormValidationSchema),
      //Cadastrando os valores padrão dos inputs
      defaultValues: { task: "", minutesAmount: 0 },
    });

  const [Cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCylceId, setActiveCylceId] = useState<string | null>(null);

  //Estado para atualizar o contador
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  function handleCreateNewCycle(data: NewCycleFormData) {
    const newId = String(new Date().getTime());
    const newCycle: Cycle = {
      //Aqui vamos pegar a data em milissegundos, sem risco de repetição de ID
      id: newId,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };
    console.log(newCycle);
    // toda vez que estiver alterando um estado e elede depender do valor anterior e interessante setar ele com um arrow function, como esta abaixo
    setCycles((state) => [...state, newCycle]);
    setActiveCylceId(newId);
    setAmountSecondsPassed(0); // resetando o contador a cada vez que um novo ciclo for criado
    reset();
  }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCylceId) {
          return { ...cycle, interruptedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );

    setActiveCylceId(null);
  }

  console.log(Cycles);

  // procurando um ciclo que tenha o mesmo ID que activeCycle
  const activeCycle = Cycles.find((cycle) => cycle.id === activeCylceId);
  console.log(`O ciclo ativo atualmente e: ${activeCylceId}`);

  // variáveis criadas para controlar o tempo
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0; // Total de Segundos
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0; // Segundos atuais
  const minutesAmount = Math.floor(currentSeconds / 60); // Minutos restantes
  const secondsAmount = currentSeconds % 60; // Segundos restantes

  // Para completar com  0 quando o número for de 9 abaixo, usa esa função padStart, ela analisa a string e adiciona um elemento caso tenha o tamanho menor que o definido no caso tem que ter ao menos 2 char na string, se não tiver ela completa com 0 no inicio, para segundos e minutos.
  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  // aqui para calcular o tempo passado vamos comparar a diferença entre a data inicial gravada em na interface cycle e a
  // data atual usando -differenceInSeconds- do pacote -date-fns- e uma forma mais precisa de contar o tempo decorrido.
  // isso atualizando a cada 1000 milissegundo (1 segundo).
  useEffect(() => {
    // se interval fosse definido dentro do if, não haveria como o return reconhcer ele devido ao escopo da variável
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );

        if (secondsDifference > totalSeconds) {
          // se a diferença de segundo for maior que o tempo decorrido ele vai registrar finished date e zerar o ciclo ativo
          setCycles(
            Cycles.map((cycle) => {
              if (cycle.id === activeCylceId) {
                return { ...cycle, finishedDate: new Date() };
              } else {
                return cycle;
              }
            })
          );
          //clearInterval(interval);
          setActiveCylceId(null);
        } else {
          //caso contrario vai realizar a contagem de tempo normalmente
          setAmountSecondsPassed(secondsDifference);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeCycle, totalSeconds, activeCylceId]);

  // ira mudar o titulo da aba apenas quando houver algum ciclo ativo
  useEffect(() => {
    if (activeCycle) {
      document.title = `Timer ${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);

  // formstate e um retorno do userform, e tem afunção erros que permite ver se houve algum erro com aquele formState
  // nesse caso vamos imprimir no console qual foi o erro que acabou ocorrendo.
  console.log(formState.errors);

  //variável criada para acompanhar o valor do input com o nome Task
  const task = watch("task");
  //variável criada para controle o disabled do botão
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task"> Vou trabalhar em </label>
          <TaskInput
            id="task"
            list="task-suggestions"
            type="text"
            placeholder="Dê um nome para o seu projeto"
            //forma de adicionar o register jutamente com o nome daquele campo
            //utilizar o Spread Operator aqui basicamente passa todos os metodos possiveis do register
            //como retornos propriedade acopladas ao input
            {...register("task")}
            // desativar os campos de input quando um ciclo estiver ativo
            disabled={!!activeCycle}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 01"></option>
            <option value="Projeto 02"></option>
            <option value="Projeto 03"></option>
            <option value="Projeto 04"></option>
            <option value="Banana com Aveia"></option>
          </datalist>

          <label htmlFor=""> durante </label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5} // o número mostrado no input vai pular de 5 em 5.
            min={1} // valor mínimo aceito no input
            max={60} // valor máximo aceito no input
            // o register permite que se passe um objeto de configuração para o input definido
            //aqui no caso o valor retornado sera um number e não uma string como foi antes
            {...register("minutesAmount", { valueAsNumber: true })}
            disabled={!!activeCycle}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}

//Task esta sendo acompanhada pela função watch, por isso ela pode se usada como validação para o botão - StartCountdownButton -
