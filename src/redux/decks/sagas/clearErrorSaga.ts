import { put, takeLatest, select, delay } from 'redux-saga/effects';
import { clearDecksError } from '../actions';
import { DecksActionTypes } from '../interface';

function* clearError() {
  const DELAY_SECONDS = 3000;
  const { error } = yield select((state) => state.decks);
  if (error) {
    yield delay(DELAY_SECONDS);
    yield put(clearDecksError(false));
  }
}

export default function* clearErrorSaga() {
  yield takeLatest([DecksActionTypes.saveSharedDeckFailure, DecksActionTypes.editDeckFailure], clearError);
}
