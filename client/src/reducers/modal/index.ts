import produce from 'immer';
import { AnyAction, Reducer } from 'redux';
import { TOGGLE_MODAL, SET_MODAL_TYPE, SET_FORM_FIELD_VALUE } from '../../actions/index';
import { FormField, State } from '../state';

const initialState: State['modal'] = {
  open: false,
  title: '',
  type: '',
  formData: {},
};

const createFormField = (mergeObj: Partial<FormField> = {}): FormField => ({
  value: '',
  error: '',
  dirty: false,
  required: false,
  ...mergeObj,
});

const modalReducer: Reducer = (state: State['modal'] = initialState, action: AnyAction) => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return produce(
        state,
        (draft: State['modal']): void => {
          draft.open = action.open;
        },
      );
    case SET_MODAL_TYPE:
      return produce(
        state,
        (draft: State['modal']): void => {
          draft.type = action.modalType;
          draft.title = action.modalType;
        },
      );
    case SET_FORM_FIELD_VALUE:
      return produce(
        state,
        (draft: State['modal']): void => {
          if (!draft.formData[action.fieldKey]) {
            draft.formData[action.fieldKey] = createFormField({ value: action.fieldValue });
          } else {
            draft.formData[action.fieldKey].value = action.fieldValue;
          }
        },
      );
    default:
      return state;
  }
};

export default modalReducer;
