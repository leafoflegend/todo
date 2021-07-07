const TOGGLE_DRAWER = 'TOGGLE_DRAWER';

interface ToggleDrawerAction {
  type: 'TOGGLE_DRAWER';
  open: boolean;
}

const toggleDrawer = (open: boolean): ToggleDrawerAction => ({
  type: TOGGLE_DRAWER,
  open,
});

export {
  TOGGLE_DRAWER,
  toggleDrawer,
};
