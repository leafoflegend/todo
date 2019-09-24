import CONSTANTS from '../../constants';

const { MODAL: { TYPES: { LOGIN } } } = CONSTANTS;

interface ModalType {
  title: string;
  type: string;
}

const switchModalType = (type: string): ModalType => {
  switch (type) {
    case LOGIN:
      return {
        title: 'Login',
        type: 'Login',
      };
    default:
      return {
        title: '',
        type: '',
      };
  }
};

export {
  switchModalType,
};
