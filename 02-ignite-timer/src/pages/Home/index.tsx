import { Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import {
  HomeContainer,
  FormContainer,
  CountdownContainer,
  Separator,
  StartCountdownButton,
  TaskInput,
  MinutesAmountInput,
} from "./styles";
import { useState } from "react";

//montagem do esquema de validação do zod e relativamente simples conforme abaixo
//e bom criar um esquema para depois adiciona-lo a fonfiguraçã do zod (linhas 24/26)
const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a Tarefa"),
  minutesAmount: zod
    .number()
    .min(5, "O ciclo precisa ser de no mínimo 05 minutos")
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

  function handleCreateNewCycle(data: NewCycleFormData) {
    const newId = String(new Date().getTime());

    const newCycle: Cycle = {
      //Aqui vamos pegar a data em milissegundos, sem risco de repetição de ID
      id: newId,
      task: data.task,
      minutesAmount: data.minutesAmount,
    };

    console.log(newCycle);
    // toda vez que estiver alterando um estado e elede depender do valor anterior e interessante setar ele com um arrow function, como esta abaixo
    setCycles((state) => [...state, newCycle]);
    setActiveCylceId(newId);
    reset();
  }

  // procurando um ciclo que tenha o mesmo ID que activeCycle
  const activeCycle = Cycles.find((cycle) => cycle.id === activeCylceId);
  console.log(`O ciclo ativo atualmente e: ${activeCylceId}`);

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
            min={5} // valor mínimo aceito no input
            max={60} // valor máximo aceito no input
            // o register permite que se passe um objeto de configuração para o input definido
            //aqui no caso o valor retornado sera um number e não uma string como foi antes
            {...register("minutesAmount", { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
}

//Task esta sendo acompanhada pela função watch, por isso ela pode se usada como validação para o botão - StartCountdownButton -
