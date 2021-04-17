import { takeLatest, call, select, put } from 'redux-saga/effects';
import Api from '../../../api';
import { DecksActionTypes, EditAndSaveSharedDeck } from '../interface';
import { RootState } from '../../store';
import { editDeckFailure } from '../actions';

function* editDeck({ deckId, shareId }: EditAndSaveSharedDeck) {
  const { decks } = yield select((state: RootState) => state.decks);
  const selectedDeck = deckId ? decks[deckId] : null;
  try {
    yield call(Api.editDeckByShareId, selectedDeck, shareId);
  } catch (error) {
    yield put(editDeckFailure(true));
  }
}

export default function* editDeckBySharedIdSaga() {
  yield takeLatest(DecksActionTypes.editAndSaveSharedDeck, editDeck);
}
