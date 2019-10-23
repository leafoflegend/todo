import React, { ChangeEvent, Component, Fragment } from 'react';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { State } from '../../reducers/state';
import { setFormField } from '../../actions/index';
import { loginFormUsernameSelector, loginFormPasswordSelector } from '../../selectors/index';

const formStyles = (theme: Theme) => createStyles({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  inputField: {
    margin: '0.5em 0',
  },
});

interface FormOwnProps {}

interface FormStateProps {
  username: string;
  password: string;
}

interface FormDispatchProps {
  changeUsername: (e: ChangeEvent<HTMLInputElement>) => void;
  changePassword: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface FormStyleProps extends WithStyles<typeof formStyles> {}

type FormProps = FormOwnProps & FormStateProps & FormDispatchProps & FormStyleProps;

class LoginForm extends Component<FormProps> {
  public render() {
    const { classes } = this.props;
    const { username, password, changePassword, changeUsername } = this.props;

    return (
      <form
        className={classes.formContainer}
        onSubmit={e => e.preventDefault()}
      >
        <TextField
          className={classes.inputField}
          value={username}
          label="Username"
          onChange={changeUsername}
          fullWidth
        />
        <TextField
          className={classes.inputField}
          value={password}
          label="Password"
          type="password"
          onChange={changePassword}
          fullWidth
        />
      </form>
    );
  }
}

const StyledLoginForm = withStyles(formStyles)(LoginForm);

const mapFormStateToProps = ({ modal }: State) => ({
  username: loginFormUsernameSelector(modal),
  password: loginFormPasswordSelector(modal),
});

const mapFormDispatchToProps = (dispatch: Dispatch) => ({
  changeUsername: (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFormField('username', e.target.value));
  },
  changePassword: (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFormField('password', e.target.value));
  },
});

const ConnectedLoginForm = connect(mapFormStateToProps, mapFormDispatchToProps)(StyledLoginForm);

export default ConnectedLoginForm;
