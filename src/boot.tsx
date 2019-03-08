import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as serviceWorker from './utils/serviceWorker';
import { configureStore } from './stores';

// Load initial state from window object, else use undefined
const initialState = window.__INITIAL_REDUX_STATE__ || undefined;
const { store, history } = configureStore(initialState);

export async function render() {
  const { Main } = await import('./Main');
  ReactDOM.render(<Main store={store} history={history} />, document.getElementById('root'));
}

export async function start() {
  await render();

  if (module.hot) {
    module.hot.accept('./Main', render);
  }

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: http://bit.ly/CRA-PWA
  serviceWorker.unregister();
}
