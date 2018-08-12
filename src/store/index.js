// Create final store using all reducers and applying middleware
import { createBrowserHistory } from 'history';
import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import reducers from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

// Configure reducer to store state at state.router
export const history = createBrowserHistory();

const middlewares = [
    sagaMiddleware,
    routerMiddleware(history)
];

const store = compose(
  // Enables your middleware:
  applyMiddleware(...middlewares),
  // Provides support for DevTools via Chrome extension
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)(connectRouter(history)(reducers));

// Extensions
store.runSaga = sagaMiddleware.run;
store.asyncReducers = {}; // Async reducer registry

sagaMiddleware.run(rootSaga);

export default store;
