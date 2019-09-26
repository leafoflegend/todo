import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles, WithStyles, createStyles, Theme, withTheme, WithTheme } from '@material-ui/core/styles';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { State } from '../../reducers/state';
import { toggleModal } from '../../actions/index';
import { modalOpenSelector, modalTitleSelector, modalTypeSelector } from '../../selectors/index';

const styles = (theme: Theme) => createStyles({

});

interface OwnProps {}

interface StateProps {
  open: boolean;
  title: string;
}

interface DispatchProps {
  onClose: () => void;
}

interface StyleProps extends WithStyles<typeof styles> {}
interface ThemeProps extends WithTheme {}
interface WidthProps {
  width: Breakpoint;
}

type Props = OwnProps & StateProps & DispatchProps & StyleProps & ThemeProps & WidthProps;

class Modal extends Component<Props> {
  private get isFullscreen(): boolean {
    const { width } = this.props;

    return isWidthDown('sm', width);
  }

  public render() {
    const { open, title, onClose } = this.props;

    return (
      <Fragment>
        <Dialog
          open={open}
          fullScreen={this.isFullscreen}
          onClose={onClose}
        >
          <DialogTitle>{title}</DialogTitle>
        </Dialog>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ modal }: State) => ({
  open: modalOpenSelector(modal),
  title: modalTitleSelector(modal),
  type: modalTypeSelector(modal),
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  onClose: () => dispatch(toggleModal(false)),
});

const StyledThemedModal = withTheme(withStyles(styles)(Modal));

const WidthSuppliedModal = withWidth()(StyledThemedModal);

const ConnectedModal = connect(mapStateToProps, mapDispatchToProps)(WidthSuppliedModal);

export default ConnectedModal;
