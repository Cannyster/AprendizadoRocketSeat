import {
  ActionTypes,
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from "../reducers/cycles/actions";
import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";
import { differenceInSeconds } from "date-fns";
interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

// criando a interface de contexto(CycleContextType) e utilizando ela como tipo de CycleContext(usando createContext)
interface CyclesContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: String | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  alterAmountSecondsPassed: (seconds: number) => void;
  CreateNewCycle: (data: CreateCycleData) => void;
  interruptCurrentCycle: () => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

//o reactnode aceita qualquer tipo de tag ou elemento como children dentro daquele elsemento, usado para definir o tipo de children
interface CycleContextProviderProps {
  children: ReactNode;
}

// tem que cadastrar esse children para que quando ele for usado em algum local, ele aceitar elementos internamente
// Lembrando que nos Hook apenas chamamos a função, e não inicializamos ela, cyclesReducer ( não cyclesReducer() )
export function CyclesContextProvider({ children }: CycleContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    }
    // (initialState) => {
    //   const storedStateAsJSON = localStorage.getItem(
    //     "@ignite-timer:cycles-state-1.0.0"
    //   );

    //   if (storedStateAsJSON) {
    //     return JSON.parse(storedStateAsJSON);
    //   }

    //   return initialState;
    // }
  );

  // Através da desestruturação podemos obter as propriedades cycles e activeCycleId do Objeto cycleState
  const { cycles, activeCycleId } = cyclesState;

  // procurando um ciclo que tenha o mesmo ID que activeCycle
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  //Estado para atualizar o contador
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    // vai atualizar o contador apenas se tiver um ciclo ativo
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
    }

    return 0;
  });

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);

    localStorage.setItem("@ignite-timer:cycles-state-1.0.0", stateJSON);
  }, [cyclesState]);

  function alterAmountSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  function CreateNewCycle(data: CreateCycleData) {
    const newId = String(new Date().getTime());
    const newCycle: Cycle = {
      id: newId,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    dispatch(addNewCycleAction(newCycle));
    setAmountSecondsPassed(0);
  }

  function interruptCurrentCycle() {
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
        alterAmountSecondsPassed,
        interruptCurrentCycle,
        CreateNewCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
