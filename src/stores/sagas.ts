import { all, fork } from 'redux-saga/effects';
import heroesSaga from './heroes/sagas';

export function* rootSaga() {
  yield all([fork(heroesSaga)]);
}
