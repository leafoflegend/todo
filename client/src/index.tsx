import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import { Provider } from 'react-redux';
import theme from './theme';
import { NavBar } from './components/index';
import store from './store/index';

class Root extends Component {
  public render() {
    return (
      <CssBaseline>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <NavBar />
          </Provider>
        </ThemeProvider>
      </CssBaseline>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('app'));
