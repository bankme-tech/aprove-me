/* eslint-disable @typescript-eslint/no-explicit-any */
import { legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import rootReducer from './reducers';

const store = createStore(
  rootReducer as any, 
  composeWithDevTools());

export default store
