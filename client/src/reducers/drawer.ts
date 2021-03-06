import produce from 'immer';
import { AnyAction, Reducer } from 'redux';
import { TOGGLE_DRAWER } from '../actions/index';
import { State } from './state';

const initialState: State['drawer'] = {
  open: false,
  destinations: [
    {
      name: 'Home',
      route: '/',
      icon: 'home',
    },
    {
      name: 'Settings',
      route: '/settings',
      icon: 'settings',
    },
  ],
};

const drawerReducer: Reducer = (state: State['drawer'] = initialState, action: AnyAction) => {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return produce(
        state,
        (draft: State['drawer']): void => {
          draft.open = action.open;
        },
      );
    default:
      return state;
  }
};

export default drawerReducer;
