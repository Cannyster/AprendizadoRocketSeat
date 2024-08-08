import { HandPalm, Play } from "phosphor-react";
import { useEffect, useState } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles";

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

export function Home() {
  const [Cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCylceId, setActiveCylceId] = useState<string | null>(null);

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

  // aqui para calcular o tempo passado vamos comparar a diferença entre a data inicial gravada em na interface cycle e a
  // data atual usando -differenceInSeconds- do pacote -date-fns- e uma forma mais precisa de contar o tempo decorrido.
  // isso atualizando a cada 1000 milissegundo (1 segundo).

  // ira mudar o titulo da aba apenas quando houver algum ciclo ativo
  useEffect(() => {
    if (activeCycle) {
      document.title = `Timer ${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);

  // formstate e um retorno do userform, e tem afunção erros que permite ver se houve algum erro com aquele formState
  // nesse caso vamos imprimir no console qual foi o erro que acabou ocorrendo.
  //console.log(formState.errors);

  //variável criada para acompanhar o valor do input com o nome Task
  const task = watch("task");
  //variável criada para controle o disabled do botão
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <NewCycleForm />
        <Countdown
          activeCycle={activeCycle}
          setCycles={setCycles}
          activeCylceId={activeCylceId}
        />

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
