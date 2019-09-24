import produce from 'immer';
import { AnyAction, Reducer } from 'redux';
import { TOGGLE_MODAL } from '../../actions/index';
import { State } from '../state';

const initialState: State['modal'] = {
  open: false,
  title: '',
  type: '',
};

const modalReducer: Reducer = (state: State['modal'] = initialState, action: AnyAction) => {
  switch (action.type) {
    case TOGGLE_MODAL:
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

export default modalReducer;
