import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import theme from './theme';
import { Shell } from './patterns/index';
import store, { history } from './store/index';

if (process.env.NODE_ENV === 'production') {
  import('./configure')
    .then(configure => configure.default())
    .then(() => {
      // TODO: Design logger for front end.
      console.log('Application configured.');
    })
    .catch(e => {
      console.error('Error configuring application.', e);
    });
}

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
