import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';

import { buildRootReducer } from './reducers';
import { rootSaga } from './sagas';

const history = createBrowserHistory();

const composeEnhancers = composeWithDevTools({});

export function configureStore(initialState?: any) {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    buildRootReducer(history),
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware), applyMiddleware(routerMiddleware(history)))
  );

  let sagaTask = sagaMiddleware.run(rootSaga);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default;
      store.replaceReducer(nextReducer);
    });

    module.hot.accept('./sagas', () => {
      const nextSagas = require('./sagas').default;
      sagaTask.cancel();
      sagaTask.done.then(() => {
        sagaTask = sagaMiddleware.run(nextSagas);
      });
    });
  }

  return { store, history };
}
