import { createContext, ReactNode, useReducer, useState } from "react";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";
import {
  ActionTypes,
  addNewCycleAction,
  interruptCurrentCycleAction,
  InterruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from "../reducers/cycles/actions";
interface CreateCycleData {
  task: string;
  minutesAmount: number;
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

//o reactnode aceita qualquer tipo de tag ou elemento como children dentro daquele elsemento, usado para definir o tipo de children
interface CycleContextProviderProps {
  children: ReactNode;
}

// tem que cadastrar esse children para que quando ele for usado em algum local, ele aceitar elementos internamente
// Lembrando que nos Hook apenas chamamos a função, e não inicializamos ela, cyclesReducer ( não cyclesReducer() )
export function CyclesContextProvider({ children }: CycleContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  });

  //Estado para atualizar o contador
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  // Através da desestruturação podemos obter as propriedades cycles e activeCycleId do Objeto cycleState
  const { cycles, activeCycleId } = cyclesState;

  // procurando um ciclo que tenha o mesmo ID que activeCycle
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

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

    dispatch(addNewCycleAction(newCycle));
    setAmountSecondsPassed(0); // resetando o contador a cada vez que um novo ciclo for criado
  }

  function InterruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction);
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction);
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
