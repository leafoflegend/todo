import React, { Component } from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import clsx from 'clsx';
import { Drawer, NavBar } from '../../components/index';
import Router from '../router/index';
import { DRAWER_WIDTH } from '../../constants';
import { State } from '../../reducers/state';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -DRAWER_WIDTH,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  });

interface StateProps {
  open: boolean;
}

interface DispatchProps {}

interface OwnProps extends WithStyles<typeof styles> {}

type Props = StateProps & DispatchProps & OwnProps;

class Shell extends Component<Props> {
  public render() {
    const { classes, open } = this.props;

    return (
      <div className={classes.root}>
        <NavBar />
        <Drawer />
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <Router />
        </main>
      </div>
    );
  }
}

const StyledShell = withStyles(styles)(Shell);

const mapStateToProps = ({ drawer: { open } }: State) => ({
  open,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({});

const ConnectedShell = connect(mapStateToProps, mapDispatchToProps)(StyledShell);

export default ConnectedShell;
