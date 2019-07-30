const TOGGLE_DRAWER = Symbol('TOGGLE_DRAWER');
const toggleDrawer = (open: boolean) => ({
  type: TOGGLE_DRAWER,
  open,
});

export {
  TOGGLE_DRAWER,
  toggleDrawer,
};
