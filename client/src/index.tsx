/* eslint import/first: 0 no-cond-assign: 0 */
if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line
  const configureClient = require('./constants');

  configureClient();
}

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import theme from './theme';
import { Shell } from './patterns/index';
import store, { history } from './store/index';

class Root extends Component {
  public render() {
    return (
      <CssBaseline>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <ConnectedRouter history={history}>
              <Shell />
            </ConnectedRouter>
          </Provider>
        </ThemeProvider>
      </CssBaseline>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('app'));
