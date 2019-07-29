import { combineReducers, Reducer } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import drawerReducer from './drawer';
import { State } from './state';

const createRootReducer = (history: History): Reducer<State> =>
  combineReducers({
    drawer: drawerReducer,
    router: connectRouter(history),
  });

export default createRootReducer;
