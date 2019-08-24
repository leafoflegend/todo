const TOGGLE_MODAL = Symbol('TOGGLE_MODAL');

const toggleModal = (open: boolean) => ({
  type: TOGGLE_MODAL,
  open,
});

export {
  TOGGLE_MODAL,
  toggleModal,
}
