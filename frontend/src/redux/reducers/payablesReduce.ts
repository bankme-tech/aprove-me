import { TPayable } from '../../types/PayableType';
import { DESCRIPTION } from '../actions/createPayableAction';

type ActionType = {
  type: string,
  data: TPayable,
}
  
const INITIAL_STATE: TPayable = {
    id: '',
    value: 0,
    assignor: '',
    emissionDate: '',
}
  

export const payablesReduce = (state = INITIAL_STATE, action: ActionType) => {
    switch (action.type) {
        case DESCRIPTION:
            return action.data;
        default:
            return state;
    }
}
