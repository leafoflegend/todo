import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles, WithStyles, createStyles, Theme, withTheme, WithTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import MediaQuery from 'react-responsive';
import { State } from '../../reducers/state';
import { modalOpenSelector } from '../../selectors/index';

const styles = (theme: Theme) => createStyles({

});

interface OwnProps {}

interface StateProps {
  open: boolean;
}

interface DispatchProps {}

interface StyleProps extends WithStyles<typeof styles> {}
interface ThemeProps extends WithTheme {}

type Props = OwnProps & StateProps & DispatchProps & StyleProps & ThemeProps;

class Modal extends Component<Props> {
  public render() {
    const { open, theme } = this.props;

    console.log(theme.breakpoints.down('sm'));

    return (
      <Fragment>
        <Dialog
          open={open}
        >
          I am a teapot.
        </Dialog>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ modal }: State) => ({
  open: modalOpenSelector(modal),
});
const mapDispatchToProps = (dispatch: Dispatch) => ({});

const StyledThemedModal = withTheme(withStyles(styles)(Modal));

const ConnectedModal = connect(mapStateToProps, mapDispatchToProps)(StyledThemedModal);

export default ConnectedModal;
