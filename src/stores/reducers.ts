import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import { RootStore } from '~/interfaces/stores';

import { heroesReducer } from './heroes/reducer';

export function buildRootReducer(history: History) {
  return combineReducers<RootStore>({
    router: connectRouter(history),
    heroes: heroesReducer
  });
}
