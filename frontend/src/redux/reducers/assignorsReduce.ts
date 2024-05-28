import { TAssignors } from '../../types/AssignorsType';
import { DESCRIPTION } from '../actions/createAssignorAction';

type ActionType = {
  type: string,
  data: TAssignors,
}
  
const INITIAL_STATE: TAssignors = {
  id: '',
  document: '',
  email: '',
  name: '',
  phone: '',
}
  

export const assignorReduce = (state = INITIAL_STATE, action: ActionType) => {
    switch (action.type) {
        case DESCRIPTION:
            return action.data;
        default:
            return state;
    }
}
