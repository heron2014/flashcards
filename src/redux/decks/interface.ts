import { Deck } from './reducer';

export enum DecksActionTypes {
  getDecks = 'GET_DECKS',
  deleteDeck = 'DELETE_DECK',
  saveDeck = 'SAVE_DECK',
  saveQuestion = 'SAVE_QUESTION',
  saveAnswer = 'SAVE_ANSWER',
  deleteCard = 'DELETE_CARD',
  scoreCard = 'SCORE_CARD',
  reorderCards = 'REORDER_CARDS',
  shuffleCards = 'SHUFFLE_CARDS',
  editSharedOnDeck = 'EDIT_SHARED_ON_DECK',
  saveSharedDeck = 'SAVE_SHARED_DECK',
  getDeckByShareId = 'GET_DECK_BY_SHARE_ID',
  addFreeDeck = 'ADD_FREE_DECK',
  editAndSaveSharedDeck = 'EDIT_AND_SAVE_SHARED_DECK',
  saveSharedDeckFailure = 'SAVE_SHARED_DECK_FAILURE',
  editDeckFailure = 'EDIT_DECK_FAILURE',
  clearDecksError = 'CLEAR_DECKS_ERROR',
  getDeckByShareIdRequest = 'GET_DECK_BY_SHARE_ID_REQUEST',
}

export enum SCORES {
  BAD = 0,
  GOOD = 1,
}

export interface GetDecks {
  type: DecksActionTypes.getDecks;
}

export interface SaveDeck {
  type: DecksActionTypes.saveDeck;
  id: string;
  title: string;
}

export interface DeleteDeck {
  type: DecksActionTypes.deleteDeck;
  id: string;
}

export interface SaveQuestion {
  type: DecksActionTypes.saveQuestion;
  deckId: string;
  cardId: string;
  question: string;
  isEdit: boolean;
}

export interface SaveAnswer {
  type: DecksActionTypes.saveAnswer;
  deckId: string;
  cardId: string;
  answer: string;
}

export interface DeleteCard {
  type: DecksActionTypes.deleteCard;
  deckId: string;
  cardId: string;
}

export interface ScoreCard {
  type: DecksActionTypes.scoreCard;
  deckId: string;
  cardId: string;
  score: number;
}

export interface ReorderCards {
  type: DecksActionTypes.reorderCards;
  deckId: string;
}

export interface ShuffleCards {
  type: DecksActionTypes.shuffleCards;
  deckId: string;
}

export interface EditSharedOnDeck {
  type: DecksActionTypes.editSharedOnDeck;
  deckId: string;
}

export interface SaveSharedDeck {
  type: DecksActionTypes.saveSharedDeck;
  deck: Deck;
  id: string;
}

export interface GetDeckByShareId {
  type: DecksActionTypes.getDeckByShareId;
  code: string;
  deckId: string | null;
}

export interface AddFreeDeck {
  type: DecksActionTypes.addFreeDeck;
  quantity: number;
}

export interface EditAndSaveSharedDeck {
  type: DecksActionTypes.editAndSaveSharedDeck;
  deckId: string;
  shareId: string;
}

export interface SaveSharedDeckFailure {
  type: DecksActionTypes.saveSharedDeckFailure;
  error: boolean;
}

export interface EditDeckFailure {
  type: DecksActionTypes.editDeckFailure;
  error: boolean;
}

export interface ClearDecksError {
  type: DecksActionTypes.clearDecksError;
  error: boolean;
}

export interface GetDeckByShareIdRequest {
  type: DecksActionTypes.getDeckByShareIdRequest;
}

export type DecksActions =
  | GetDecks
  | SaveDeck
  | DeleteDeck
  | SaveQuestion
  | SaveAnswer
  | DeleteCard
  | ScoreCard
  | ReorderCards
  | ShuffleCards
  | EditSharedOnDeck
  | SaveSharedDeck
  | GetDeckByShareId
  | AddFreeDeck
  | EditAndSaveSharedDeck
  | SaveSharedDeckFailure
  | EditDeckFailure
  | ClearDecksError
  | GetDeckByShareIdRequest;
