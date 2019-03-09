import * as React from 'react';
import App from './modules/core/App';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';

import { KataReset } from '@kata-kit/reset';

import { RootStore } from './interfaces/stores';

interface MainProps {
  store: Store<RootStore>;
  history: History;
}

export const Main: React.SFC<MainProps> = ({ store, history }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <KataReset>
        <App />
      </KataReset>
    </ConnectedRouter>
  </Provider>
);
