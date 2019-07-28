import { combineReducers } from 'redux';
import drawerReducer from './drawer';

const rootReducer = combineReducers({
  drawer: drawerReducer,
});

export default rootReducer;
