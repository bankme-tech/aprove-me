import { combineReducers } from 'redux';
import { payablesReduce } from './payablesReduce';
import { assignorReduce } from './assignorsReduce';

const rootReducer = combineReducers({
  payablesReduce,
  assignorReduce,
})

export default rootReducer;