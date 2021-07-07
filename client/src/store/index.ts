import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import createRootReducer from '../reducers';

const history = createBrowserHistory();

const middleware = [routerMiddleware(history)];

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line
  const { createLogger } = require('redux-logger');

  middleware.push(createLogger());
}

const store = createStore(
  createRootReducer(history),
  composeWithDevTools(applyMiddleware(...middleware)),
);

export { history };

export default store;
