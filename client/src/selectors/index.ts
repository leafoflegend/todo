import { State } from '../reducers/state';

const modalOpenSelector = (modal: State["modal"]) => modal.open;
const modalTitleSelector = (modal: State["modal"]) => modal.title;
const modalTypeSelector = (modal: State["modal"]) => modal.type;
const loginFormUsernameSelector = (modal: State["modal"]) => modal.formData.username && modal.formData.username.value || '';
const loginFormPasswordSelector = (modal: State["modal"]) => modal.formData.password && modal.formData.password.value || '';
const drawerOpenSelector = (drawer: State["drawer"]) => drawer.open;
const drawerDestinationsSelector = (drawer: State["drawer"]) => drawer.destinations;

export {
  modalOpenSelector,
  drawerOpenSelector,
  drawerDestinationsSelector,
  modalTitleSelector,
  modalTypeSelector,
  loginFormPasswordSelector,
  loginFormUsernameSelector,
};
