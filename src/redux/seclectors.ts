import { createSelector } from 'reselect';
import * as R from 'ramda';
import { RootState } from './store';

export const selectAllDecks = (state: RootState) => state.decks.decks;

export const selectMaxFreeDecks = (state: RootState) => state.decks.maxFreeDecks;

export const selectDecks = createSelector([selectAllDecks], (decks) => decks);

export const selectDeckItem = (id: string) => createSelector([selectDecks], (decks) => decks[id]);

export const selectCard = (deckId: string, id: string | undefined) =>
  createSelector([selectDecks], (decks) =>
    id ? decks[deckId].cards.find((card) => card.id === id) : undefined,
  );

export const selectBadAnswers = (deckId: string) =>
  createSelector([selectDeckItem(deckId)], (decks) =>
    !R.isEmpty(decks) ? decks.cards.filter((c) => c.rank === 0).length : 0,
  );

export const selectGoodAnswers = (deckId: string) =>
  createSelector([selectDeckItem(deckId)], (decks) =>
    !R.isEmpty(decks) ? decks.cards.filter((c) => c.rank !== null && c.rank > 0).length : 0,
  );
