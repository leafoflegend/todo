import { State } from '../reducers/state';

const modalOpenSelector = (modal: State["modal"]) => modal.open;
const modalTitleSelector = (modal: State["modal"]) => modal.title;
const modalTypeSelector = (modal: State["modal"]) => modal.type;
const drawerOpenSelector = (drawer: State["drawer"]) => drawer.open;
const drawerDestinationsSelector = (drawer: State["drawer"]) => drawer.destinations;

export {
  modalOpenSelector,
  drawerOpenSelector,
  drawerDestinationsSelector,
  modalTitleSelector,
  modalTypeSelector,
};
