import React, { Component } from 'react';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { Dispatch } from 'redux';
import { State } from '../../reducers/state';
import CONSTANTS from '../../constants';
import { toggleDrawer, toggleModal, setModalType } from '../../actions/index';
import { drawerOpenSelector } from '../../selectors/index';

const { VISUAL: { DRAWER_WIDTH }, MODAL: { TYPES: { LOGIN } } } = CONSTANTS;

const styles = (theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      marginLeft: DRAWER_WIDTH,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    hide: {
      display: 'none',
    },
  });

interface StateProps {
  open: boolean;
}

interface DispatchProps {
  login: () => void;
  handleDrawerOpen: () => void;
}

interface OwnProps extends WithStyles<typeof styles> {}

type Props = StateProps & DispatchProps & OwnProps;

class NavBar extends Component<Props> {
  public render() {
    const { classes, open, handleDrawerOpen, login } = this.props;
    return (
      <AppBar
        position="sticky"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            ToDo
          </Typography>
          <Button color="inherit" onClick={login}>Login</Button>
        </Toolbar>
      </AppBar>
    );
  }
}

const StyledNavBar = withStyles(styles)(NavBar);

const mapStateToProps = ({ drawer }: State) => ({
  open: drawerOpenSelector(drawer),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  login: () => {
    dispatch(toggleModal(true));
    dispatch(setModalType(LOGIN));
  },
  handleDrawerOpen: () => dispatch(toggleDrawer(true)),
});

const ConnectedNavBar = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StyledNavBar);

export default ConnectedNavBar;
