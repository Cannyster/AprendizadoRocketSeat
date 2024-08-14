import { produce } from "immer";
import { ActionTypes } from "./actions";

export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return produce(state, (draft) => {
        console.log(action.type);
        draft.cycles.push(action.payload.newCycle);
        draft.activeCycleId = action.payload.newCycle.id;
        console.log("Criando um novo ciclo");
      });
    case ActionTypes.INTERRUPT_CURRENT_CYCLE:
      var currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId;
      });

      if (currentCycleIndex < 0) {
        return state;
      }

      return produce(state, (draft) => {
        draft.activeCycleId = null;
        draft.cycles[currentCycleIndex].interruptedDate = new Date();
        console.log("Interrompendo um ciclo");
        console.log(action.type);
      });
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
      var currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId;
      });

      if (currentCycleIndex < 0) {
        return state;
      }
      return produce(state, (draft) => {
        draft.activeCycleId = null;
        draft.cycles[currentCycleIndex].finishedDate = new Date();
        console.log("Finalizando um ciclo");
        console.log(action.type);
      });
    default:
      return state;
  }
}

// export function cyclesReducer(state: CyclesState, action: any) {
//   if (action.type == ActionTypes.ADD_NEW_CYCLE) {
//     return produce(state, (draft) => {
//       draft.cycles.push(action.payload.newCycle);
//       draft.activeCycleId = action.payload.newCycle.id;
//       console.log("Criando um novo ciclo");
//     });
//   } else if (action.type == ActionTypes.INTERRUPT_CURRENT_CYCLE) {
//     const currentCycleIndex = state.cycles.findIndex((cycle) => {
//       return cycle.id === state.activeCycleId;
//     });

//     if (currentCycleIndex < 0) {
//       return state;
//     }

//     return produce(state, (draft) => {
//       draft.activeCycleId = null;
//       draft.cycles[currentCycleIndex].interruptedDate = new Date();
//       console.log("Interrompendo um ciclo");
//     });
//   } else if (action.type == ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED) {
//     const currentCycleIndex = state.cycles.findIndex((cycle) => {
//       return cycle.id === state.activeCycleId;
//     });

//     if (currentCycleIndex < 0) {
//       return state;
//     }

//     return produce(state, (draft) => {
//       draft.activeCycleId = null;
//       draft.cycles[currentCycleIndex].finishedDate = new Date();
//       console.log("Finalizando um ciclo");
//     });
//   } else {
//     return state;
//   }
// }
