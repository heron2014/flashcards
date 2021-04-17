import {
  SaveDeck,
  DecksActionTypes,
  DeleteDeck,
  GetDecks,
  SaveQuestion,
  SaveAnswer,
  ScoreCard,
  ReorderCards,
  ShuffleCards,
  EditSharedOnDeck,
  SaveSharedDeck,
  GetDeckByShareId,
} from './interface';
import { Deck } from './reducer';

export const getDecks = (): GetDecks => ({
  type: DecksActionTypes.getDecks,
});

export const saveDeck = (id: string, title: string): SaveDeck => ({
  type: DecksActionTypes.saveDeck,
  id,
  title,
});

export const deleteDeck = (id: string): DeleteDeck => ({
  type: DecksActionTypes.deleteDeck,
  id,
});

export const saveQuestion = (
  deckId: string,
  cardId: string,
  question: string,
  isEdit: boolean,
): SaveQuestion => ({
  type: DecksActionTypes.saveQuestion,
  deckId,
  cardId,
  question,
  isEdit,
});

export const saveAnswer = (deckId: string, cardId: string, answer: string): SaveAnswer => ({
  type: DecksActionTypes.saveAnswer,
  deckId,
  cardId,
  answer,
});

export const deleteCard = (deckId: string, cardId: string) => ({
  type: DecksActionTypes.deleteCard,
  deckId,
  cardId,
});

export const scoreCard = (deckId: string, cardId: string, score: number): ScoreCard => ({
  type: DecksActionTypes.scoreCard,
  deckId,
  cardId,
  score,
});

export const sortByRankCards = (deckId: string): ReorderCards => ({
  type: DecksActionTypes.reorderCards,
  deckId,
});

export const shuffleCards = (deckId: string): ShuffleCards => ({
  type: DecksActionTypes.shuffleCards,
  deckId,
});

export const editSharedOnDeck = (deckId: string): EditSharedOnDeck => ({
  type: DecksActionTypes.editSharedOnDeck,
  deckId,
});

export const saveSharedDeck = (deck: Deck, id: string): SaveSharedDeck => ({
  type: DecksActionTypes.saveSharedDeck,
  deck,
  id,
});

export const getDeckByShareId = (code: string, deckId: string | null): GetDeckByShareId => ({
  type: DecksActionTypes.getDeckByShareId,
  code,
  deckId,
});

export const addFreeDeck = (quantity: number) => ({
  type: DecksActionTypes.addFreeDeck,
  quantity,
});

export const editAndSaveSharedDeck = (deckId: string, shareId: string) => ({
  type: DecksActionTypes.editAndSaveSharedDeck,
  deckId,
  shareId,
});

export const saveSharedDeckFailure = (error: boolean) => ({
  type: DecksActionTypes.saveSharedDeckFailure,
  error,
});

export const editDeckFailure = (error: boolean) => ({
  type: DecksActionTypes.editDeckFailure,
  error,
});

export const clearDecksError = (error: boolean) => ({
  type: DecksActionTypes.clearDecksError,
  error,
});

export const getDeckByShareIdRequest = () => ({
  type: DecksActionTypes.getDeckByShareIdRequest,
});
