import { createContext, ReactNode, useReducer, useState } from "react";

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

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}
// criando a interface de contexto(CycleContextType) e utilizando ela como tipo de CycleContext(usando createContext)
interface CyclesContextType {
  cycles: Cycle[];
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
  const [cyclesState, dispatch] = useReducer(
    (state: CyclesState, action: any) => {
      switch (action.type) {
        case "ADD_NEW_CYCLE":
          return {
            ...state,
            cycles: [...state.cycles, action.payload.newCycle],
            activeCycleId: action.payload.newCycle.id,
          };

        case "INTERRUPT_CURRENT_CYCLE":
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleId) {
                return { ...cycle, interruptedDate: new Date() };
              } else {
                return cycle;
              }
            }),
            activeCycleId: null,
          };

        case "MARK_CURRENT_CYCLE_AS_FINISHED":
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleId) {
                return { ...cycle, finishedDate: new Date() };
              } else {
                return cycle;
              }
            }),
            activeCycleId: null,
          };

        default:
          return state;
      }
    },
    {
      cycles: [],
      activeCycleId: null,
    }
  );

  //Estado para atualizar o contador
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  // Através da desestruturação podemos obter as propriedades cycles e activeCycleId do Objeto cycleState
  const { cycles, activeCycleId } = cyclesState;

  // procurando um ciclo que tenha o mesmo ID que activeCycle
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  /* Função criada para não fosse necessário enviar o setCycles para os outros componentes, não e legal enviar eles diretamente
  o ideal e criar uma função que faça essa modificação, e então enviar essa função no lugar do item que altera o estado */
  function markCurrentCycleAsFinished() {
    dispatch({
      type: "MARK_CURRENT_CYCLE_AS_FINISHED",
      payload: {
        activeCycleId,
      },
    });
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
    // toda vez que estiver alterando um estado e elede depender do valor anterior e interessante setar ele com um arrow function, como esta abaixo
    //setCycles((state) => [...state, newCycle]);
    dispatch({
      type: "ADD_NEW_CYCLE",
      payload: {
        newCycle,
      },
    });

    setAmountSecondsPassed(0); // resetando o contador a cada vez que um novo ciclo for criado
    //reset();
  }

  function InterruptCurrentCycle() {
    dispatch({
      type: "INTERRUPT_CURRENT_CYCLE",
      payload: {
        activeCycleId,
      },
    });
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
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
