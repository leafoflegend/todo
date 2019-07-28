import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';

const middleware = [];

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line
  const { createLogger } = require('redux-logger');

  middleware.push(createLogger());
}

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
