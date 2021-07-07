import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';
import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

const actionStyles = (theme: Theme) => createStyles({});

interface ActionOwnProps {}

interface ActionStateProps {}

interface ActionDispatchProps {}

interface ActionStyleProps extends WithStyles<typeof actionStyles> {}

type ActionProps = ActionOwnProps & ActionStateProps & ActionDispatchProps & ActionStyleProps;

class LoginAction extends Component<ActionProps> {
  public render() {
    return (
      <Fragment>
        <Button>
          Signup
        </Button>
        <Button>
          Login
        </Button>
      </Fragment>
    );
  }
}

const StyledLoginAction = withStyles(actionStyles)(LoginAction);

const mapActionStateToProps = () => ({});

const mapActionDispatchToProps = (dispatch: Dispatch) => ({});

const ConnectedLoginAction = connect(mapActionStateToProps, mapActionDispatchToProps)(StyledLoginAction);

export default ConnectedLoginAction;
