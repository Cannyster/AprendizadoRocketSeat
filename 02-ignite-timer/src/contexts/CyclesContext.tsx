import { createContext, ReactNode, useState } from "react";

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

// criando a interface de contexto(CycleContextType) e utilizando ela como tipo de CycleContext(usando createContext)
interface CyclesContextType {
  Cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: String | null;
  amountSecondsPassed: number; // indicando que isto e uma função que não tem parâmetros nem tem retorno coisa do type
  markCurrentCycleAsFinished: () => void;
  setActiveCycleIdAsNull: () => void;
  alterAmountSecondsPassed: (seconds: number) => void;
  CreateNewCycle: (data: CreateCycleData) => void;
  InterruptCurrentCycle: () => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

//o reactnode aceita qualquer tipo de tag ou elemento como children dentro daquele elemento, usado para definir o tipo de children
interface CycleContextProviderProps {
  children: ReactNode;
}

// tem que cadastrar esse children para que quando ele for usado em algum local, ele aceitar elementos internamente
export function CyclesContextProvider({ children }: CycleContextProviderProps) {
  const [Cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

  //Estado para atualizar o contador
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  // procurando um ciclo que tenha o mesmo ID que activeCycle
  const activeCycle = Cycles.find((cycle) => cycle.id === activeCycleId);

  /* Função criada para não fosse necessário enviar o setCycles para os outros componentes, não e legal enviar eles diretamente
  o ideal e criar uma função que faça essa modificação, e então enviar essa função no lugar do item que altera o estado */
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

  function CreateNewCycle(data: CreateCycleData) {
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
    //reset();
  }

  function InterruptCurrentCycle() {
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

  return (
    <CyclesContext.Provider
      value={{
        Cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        markCurrentCycleAsFinished,
        setActiveCycleIdAsNull,
        alterAmountSecondsPassed,
        InterruptCurrentCycle,
        CreateNewCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
