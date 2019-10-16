const TOGGLE_MODAL = 'TOGGLE_MODAL';
const SET_MODAL_TYPE = 'SET_MODAL_TYPE';
const SET_FORM_FIELD_VALUE = 'SET_FORM_FIELD_VALUE';

interface ToggleModalAction {
  type: 'TOGGLE_MODAL';
  open: boolean;
}

const toggleModal = (open: boolean): ToggleModalAction => ({
  type: TOGGLE_MODAL,
  open,
});

interface SetModalTypeAction {
  type: 'SET_MODAL_TYPE';
  modalType: string;
}

const setModalType = (modalType: string): SetModalTypeAction => ({
  type: SET_MODAL_TYPE,
  modalType,
});

interface SetFormFieldAction {
  type: 'SET_FORM_FIELD_VALUE';
  fieldKey: string;
  fieldValue: any;
}

const setFormField = (fieldKey: string, fieldValue: any): SetFormFieldAction => ({
  type: SET_FORM_FIELD_VALUE,
  fieldKey,
  fieldValue,
});

export {
  TOGGLE_MODAL,
  toggleModal,
  SET_MODAL_TYPE,
  setModalType,
  SET_FORM_FIELD_VALUE,
  setFormField,
}
