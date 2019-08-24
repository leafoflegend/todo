import { State } from '../reducers/state';

const modalOpenSelector = (modal: State["modal"]) => modal.open;
const drawerOpenSelector = (drawer: State["drawer"]) => drawer.open;
const drawerDestinationsSelector = (drawer: State["drawer"]) => drawer.destinations;

export {
  modalOpenSelector,
  drawerOpenSelector,
  drawerDestinationsSelector,
};
