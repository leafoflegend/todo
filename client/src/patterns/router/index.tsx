import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

class Router extends Component {
  public render() {
    return (
      <>
        <Switch>
          <Route render={() => (<div>Route Not Matched</div>)} />
        </Switch>
      </>
    );
  }
}

export default Router;
