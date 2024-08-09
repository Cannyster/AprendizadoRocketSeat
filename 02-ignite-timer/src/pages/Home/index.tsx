import { HandPalm, Play } from "phosphor-react";
import { createContext, useState } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import * as zod from "zod";
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

// criando a interface de contexto(CycleContextType) e utilizando ela como tipo de CycleContext(usando createContext)
interface CyclesContextType {
  activeCycle: Cycle | undefined;
  activeCycleId: String | null;
  markCurrentCycleAsFinished: () => void;
  setActiveCycleIdAsNull: () => void;
  alterAmountSecondsPassed: (seconds: number) => void;
  amountSecondsPassed: number; // indicando que isto e uma função que não tem parâmetros nem tem retorno coisa do type
}

export const CyclesContext = createContext({} as CyclesContextType);

export function Home() {
  const [Cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

  //Estado para atualizar o contador
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  //montagem do esquema de validação do zod e relativamente simples conforme abaixo
  //e bom criar um esquema para depois adiciona-lo a fonfiguraçã do zod (linhas 24/26)
  const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, "Informe a Tarefa"),
    minutesAmount: zod
      .number()
      .min(1, "O ciclo precisa ser de no mínimo 05 minutos")
      .max(60, "O ciclo precisa ser de no máximo 60 minutos"),
  });

  //o zod pode inferir qual o tipo e estrutura dos objetos apartir do schema
  // como typescript não entende bem variáveis javascript, e necessário usar o type of para o typescript reconhecer ela
  type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

  //função Register adiciona inputs ao formulario e HandleSubmit
  //a função reset indicada na desestruturação, ela volta o valor dos campos para o valor original definido em defaultValues
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    //Cadastrando os valores padrão dos inputs
    defaultValues: { task: "", minutesAmount: 0 },
  });

  //desestruturando as informações de newCycleForm, para extrair apenas alguma funções que preciso e
  //assim continuo tendo a variável newCycleForm conforme definida acima
  const { register, handleSubmit, watch, formState, reset } = newCycleForm;

  // Função criada para não fosse necessário enviar o setCycles para os outros componentes, não e legal enviar eles diretamente
  // o ideal e criar uma função que faça essa modificação, e então enviar essa função no lugar do item que altera o estado
  function markCurrentCycleAsFinished() {
    setCycles(
      Cycles.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
  }

  function setActiveCycleIdAsNull() {
    setActiveCycleId(null);
  }

  function alterAmountSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

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
    setActiveCycleId(newId);
    setAmountSecondsPassed(0); // resetando o contador a cada vez que um novo ciclo for criado
    reset();
  }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );

    setActiveCycleId(null);
  }

  console.log(Cycles);

  // procurando um ciclo que tenha o mesmo ID que activeCycle
  const activeCycle = Cycles.find((cycle) => cycle.id === activeCycleId);
  console.log(`O ciclo ativo atualmente e: ${activeCycleId}`);

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
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            amountSecondsPassed,
            markCurrentCycleAsFinished,
            setActiveCycleIdAsNull,
            alterAmountSecondsPassed,
          }}
        >
          <FormProvider
            {
              ...newCycleForm /*{mais uma forma de passar atributos como propriedade para NewCycleForm}*/
            }
          >
            <NewCycleForm />
          </FormProvider>
          <Countdown />
        </CyclesContext.Provider>

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
/* active cycle no countdown, esta recebendo informações de activecycle para que funcione corretamente, posteriormente ver mais sobre 
comunicação entre componentes linha 91*/
