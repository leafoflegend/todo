const TOGGLE_MODAL = 'TOGGLE_MODAL';
const SET_MODAL_TYPE = 'SET_MODAL_TYPE';

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

export {
  TOGGLE_MODAL,
  toggleModal,
  SET_MODAL_TYPE,
  setModalType,
}
