import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  withStyles,
  withTheme,
  Theme,
  createStyles,
  WithStyles,
} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Icon } from '@material-ui/core';
import { push } from 'connected-react-router';
import { State, Desination } from '../../reducers/state';
import CONSTANTS from '../../constants';
import { toggleDrawer } from '../../actions/index';
import { drawerDestinationsSelector, drawerOpenSelector } from '../../selectors/index';

const { VISUAL: { DRAWER_WIDTH } } = CONSTANTS;

const styles = (theme: Theme) =>
  createStyles({
    drawer: {
      width: DRAWER_WIDTH,
      flexShrink: 0,
    },
    drawerPaper: {
      width: DRAWER_WIDTH,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: '0 8px',
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
  });

interface OwnProps extends WithStyles<typeof styles> {
  theme: Theme;
}

interface StateProps {
  open: boolean;
  destinations: Desination[];
}

interface DispatchProps {
  handleDrawerClose: () => void;
  goTo: (route: string) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

class NavDrawer extends Component<Props> {
  public render() {
    const { classes, open, handleDrawerClose, theme, destinations, goTo } = this.props;

    return (
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {destinations.map((destination: { name: string, icon: string, route: string }) => (
            <ListItem
              button
              key={destination.name}
              onClick={() => goTo(destination.route)}
            >
              <ListItemIcon>
                <Icon>
                  { destination.icon }
                </Icon>
              </ListItemIcon>
              <ListItemText primary={destination.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    );
  }
}

const ThemedStyledNavDrawer = withTheme(withStyles(styles)(NavDrawer));

const mapStateToProps = ({ drawer }: State): StateProps => ({
  open: drawerOpenSelector(drawer),
  destinations: drawerDestinationsSelector(drawer),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  handleDrawerClose: () => dispatch(toggleDrawer(false)),
  goTo: (route: string) => dispatch(push(route)),
});

const ConnectedNavDrawer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ThemedStyledNavDrawer);

export default ConnectedNavDrawer;
