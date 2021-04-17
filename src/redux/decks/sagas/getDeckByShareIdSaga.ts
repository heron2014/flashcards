import { put, takeLatest, call, select } from 'redux-saga/effects';
import Api from '../../../api';
import { getDeckByShareIdRequest, saveSharedDeck, saveSharedDeckFailure } from '../actions';
import { DecksActionTypes, GetDeckByShareId } from '../interface';
import { RootState } from '../../store';

function* getDeckByShareIdSaga({ code, deckId }: GetDeckByShareId) {
  const { decks } = yield select((state: RootState) => state.decks);
  const selectedDeck = deckId ? decks[deckId] : null;
  try {
    yield put(getDeckByShareIdRequest());
    const response = yield call(Api.getSharedDeckBySharedId, code);
    const id = deckId || response.data.id;
    const deck = {
      owner: response.data.owner,
      title: response.data.title,
      cards: response.data.cards,
      shareId: response.data.share_id,
      sharedByYou: selectedDeck ? selectedDeck.isOwner : false,
      sharedWithYou: selectedDeck ? !selectedDeck.isOwner : true,
      isOwner: selectedDeck ? selectedDeck.isOwner : false,
    };
    yield put(saveSharedDeck(deck, id));
  } catch (error) {
    yield put(saveSharedDeckFailure(true));
  }
}

export default function* watchGetDeckByShareId() {
  yield takeLatest(DecksActionTypes.getDeckByShareId, getDeckByShareIdSaga);
}
