import produce from 'immer';
import { Action, Reducer } from 'redux';
import { TOGGLE_DRAWER } from '../actions/index';
import { State } from './state';

const initialState: State["drawer"] = {
  open: false,
};

const drawerReducer: Reducer = (state: State["drawer"], action: Action) => {
  switch(action.type) {
    case TOGGLE_DRAWER:
      return produce(state, (draft: State["drawer"]): void => {
        draft.open = !draft.open;
      });
    default:
      return state;
  }
};

export default drawerReducer;
