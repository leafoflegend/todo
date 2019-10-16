import React, { Component, Fragment, ExoticComponent, Suspense } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles, WithStyles, createStyles, Theme, withTheme, WithTheme } from '@material-ui/core/styles';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { State } from '../../reducers/state';
import { toggleModal } from '../../actions/index';
import { modalOpenSelector, modalTitleSelector, modalTypeSelector } from '../../selectors/index';
import CONSTANTS from '../../constants';

const { MODAL: { TYPES: { LOGIN } } } = CONSTANTS;

const SuspenseComponent = () => <div>Loading...</div>;
const LoginForm = React.lazy(() => import('../../businents/login-form/index'));
const LoginActions = React.lazy(() => import('../../businents/login-form/actions'));
const InvalidModalType = React.lazy(() => import('../../businents/invalid-modal-type/index'));
const InvalidModalAction = React.lazy(() => import('../../businents/invalid-modal-action/index'));

const styles = (theme: Theme) => createStyles({});

interface OwnProps {}

interface StateProps {
  open: boolean;
  title: string;
  type: string;
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

const customDialogStyles = createStyles({
  paper: {
    minWidth: '600px',
  },
});

const CustomDialog = withStyles(customDialogStyles)(Dialog);

class Modal extends Component<Props> {
  private get isFullscreen(): boolean {
    const { width } = this.props;

    return isWidthDown('xs', width);
  }

  private get TypedDialogContent(): ExoticComponent<any> {
    const { type } = this.props;

    switch (type) {
      case LOGIN:
        return LoginForm;
      default:
        return InvalidModalType;
    }
  }

  private get TypedDialogActions(): ExoticComponent<any> {
    const { type } = this.props;

    switch (type) {
      case LOGIN:
        return LoginActions;
      default:
        return InvalidModalAction;
    }
  }

  public render() {
    const { open, title, onClose, classes } = this.props;
    const { TypedDialogContent, TypedDialogActions } = this;

    return (
      <Fragment>
        <CustomDialog
          open={open}
          fullScreen={this.isFullscreen}
          onClose={onClose}
        >
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <Suspense
              fallback={<SuspenseComponent />}
            >
              { <TypedDialogContent /> }
            </Suspense>
          </DialogContent>
          <DialogActions>
            <Suspense
              fallback={<SuspenseComponent />}
            >
              { <TypedDialogActions /> }
            </Suspense>
          </DialogActions>
        </CustomDialog>
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
