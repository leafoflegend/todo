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
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { State } from '../../reducers/state';
import { DRAWER_WIDTH } from '../../constants';
import { toggleDrawer } from '../../actions/index';

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
}

interface DispatchProps {
  handleDrawerClose: () => void;
}

type Props = OwnProps & StateProps & DispatchProps;

class NavDrawer extends Component<Props> {
  public render() {
    const { classes, open, handleDrawerClose, theme } = this.props;

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
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    );
  }
}

const ThemedStyledNavDrawer = withTheme(withStyles(styles)(NavDrawer));

const mapStateToProps = ({ drawer: { open } }: State): StateProps => ({
  open,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  handleDrawerClose: () => dispatch(toggleDrawer(false)),
});

const ConnectedNavDrawer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ThemedStyledNavDrawer);

export default ConnectedNavDrawer;
