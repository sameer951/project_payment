import thunkMiddleware from 'redux-thunk';
import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import { createLogger } from 'redux-logger';
import reducers from './reducers';
import ReduxThunk from "redux-thunk" 

function getInitialState() {
  return {}
}

export default ((initialState = getInitialState()) => {
  let middlewares = [createLogger(),ReduxThunk];
  return createStore(reducers, initialState, compose(applyMiddleware(...middlewares)));
})();
