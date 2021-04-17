import * as R from 'ramda';
// reference https://www.npmjs.com/package/react-native-get-random-values
import 'react-native-get-random-values';
import { customAlphabet } from 'nanoid';

import { DecksActions, DecksActionTypes, SCORES } from './interface';
import { shuffleArray } from '../../lib';

const shareId = customAlphabet('1234567890', 5);

export interface Card {
  question: string;
  answer: string;
  id: string;
  rank: number | null;
}

export interface Deck {
  title: string;
  owner: string;
  shareId: string;
  isOwner: boolean;
  sharedByYou: boolean;
  sharedWithYou: boolean;
  cards: Card[];
}

export interface DecksState {
  decks: {
    [id: string]: Deck;
  };
  maxFreeDecks: number;
  error: boolean;
  isLoading: boolean;
}

export const initialState: DecksState = {
  decks: {},
  maxFreeDecks: 5,
  error: false,
  isLoading: false,
};

const updateCards = R.curry((newCard: Partial<Card>, card: Card) => {
  if (newCard.id === card.id) {
    return { ...card, ...newCard };
  }
  return card;
});

export default function decks(state = initialState, action: DecksActions): DecksState {
  switch (action.type) {
    case DecksActionTypes.getDeckByShareIdRequest:
      return {
        ...state,
        isLoading: true,
        decks: {
          ...state.decks,
        },
      };
    case DecksActionTypes.clearDecksError:
    case DecksActionTypes.saveSharedDeckFailure:
    case DecksActionTypes.editDeckFailure:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        decks: {
          ...state.decks,
        },
      };
    case DecksActionTypes.saveDeck: {
      if (action.id in state.decks) {
        // rename current deck title
        return {
          ...state,
          error: false,
          isLoading: false,
          decks: {
            ...state.decks,
            [action.id]: { ...state.decks[action.id], title: action.title },
          },
        };
      }
      return {
        ...state,
        error: false,
        isLoading: false,
        decks: {
          [action.id]: {
            title: action.title,
            owner: '',
            shareId: shareId(),
            isOwner: true,
            sharedByYou: false,
            sharedWithYou: false,
            cards: [],
          },
          ...state.decks,
        },
      };
    }
    case DecksActionTypes.deleteDeck: {
      const updatedDecks = R.omit([action.id], state.decks);
      return {
        ...state,
        decks: updatedDecks,
      };
    }
    case DecksActionTypes.saveQuestion: {
      const { cardId, question, deckId, isEdit } = action;
      const selectedDeckCards = state.decks[deckId].cards;
      if (isEdit) {
        const updatedCards: Card[] = R.map(updateCards({ id: cardId, question }), selectedDeckCards);
        return {
          ...state,
          error: false,
          isLoading: false,
          decks: {
            ...state.decks,
            [deckId]: { ...state.decks[deckId], cards: updatedCards },
          },
        };
      }
      const newCard = {
        id: cardId,
        question,
        answer: '',
        rank: null,
      };
      const newCards = R.prepend(newCard, selectedDeckCards); // unshift
      return {
        ...state,
        error: false,
        isLoading: false,
        decks: {
          ...state.decks,
          [deckId]: { ...state.decks[deckId], cards: newCards },
        },
      };
    }

    case DecksActionTypes.saveAnswer: {
      const { cardId, deckId, answer } = action;
      const selectedDeckCards = state.decks[deckId].cards;
      const updatedCards: Card[] = R.map(updateCards({ id: cardId, answer }), selectedDeckCards);
      return {
        ...state,
        error: false,
        isLoading: false,
        decks: {
          ...state.decks,
          [deckId]: {
            ...state.decks[deckId],
            cards: updatedCards,
          },
        },
      };
    }
    case DecksActionTypes.deleteCard: {
      const { cardId, deckId } = action;
      const selectedDeckCards = state.decks[deckId].cards;
      const updatedCards = R.reject(R.propEq('id', cardId), selectedDeckCards);
      return {
        ...state,
        decks: {
          [deckId]: {
            ...state.decks[deckId],
            cards: updatedCards,
          },
        },
      };
    }

    case DecksActionTypes.scoreCard: {
      const { cardId, deckId, score } = action;
      const selectedDeckCards = state.decks[deckId].cards;
      const card = R.find(R.propEq('id', cardId), selectedDeckCards);

      const rankScore = R.cond([
        [R.propEq('score', SCORES.BAD), R.always(0)],
        [R.propEq('score', SCORES.GOOD), ({ rank }: { rank: number }) => rank + 1],
      ])({ score, rank: card!.rank });

      const updatedCards: Card[] = R.map(updateCards({ id: cardId, rank: rankScore }), selectedDeckCards);
      return {
        ...state,
        decks: {
          ...state.decks,
          [deckId]: {
            ...state.decks[deckId],
            cards: updatedCards,
          },
        },
      };
    }
    case DecksActionTypes.reorderCards: {
      const { deckId } = action;
      const selectedDeckCards = state.decks[deckId].cards;
      const sortByRank = R.sortWith([R.ascend(R.prop('rank'))]);

      return <DecksState>{
        ...state,
        decks: {
          ...state.decks,
          [deckId]: {
            ...state.decks[deckId],
            cards: sortByRank(selectedDeckCards),
          },
        },
      };
    }
    case DecksActionTypes.shuffleCards: {
      const { deckId } = action;
      const selectedDeckCards = state.decks[deckId].cards;
      const cards = shuffleArray(selectedDeckCards);

      return <DecksState>{
        ...state,
        decks: {
          ...state.decks,
          [deckId]: {
            ...state.decks[deckId],
            cards,
          },
        },
      };
    }
    case DecksActionTypes.editSharedOnDeck: {
      const { deckId } = action;
      return {
        ...state,
        isLoading: false,
        decks: {
          ...state.decks,
          [deckId]: {
            ...state.decks[deckId],
            sharedByYou: true,
          },
        },
      };
    }
    case DecksActionTypes.addFreeDeck: {
      const { quantity } = action;
      return {
        ...state,
        maxFreeDecks: state.maxFreeDecks + quantity,
        decks: {
          ...state.decks,
        },
      };
    }
    case DecksActionTypes.saveSharedDeck: {
      const { deck, id } = action;
      if (id in state.decks) {
        // do I need this?
        return {
          ...state,
          isLoading: false,
          decks: {
            ...state.decks,
            [id]: {
              ...state.decks[id],
              ...deck,
            },
          },
        };
      }
      return {
        ...state,
        isLoading: false,
        decks: {
          ...state.decks,
          [id]: deck,
        },
      };
    }
    default:
      return state;
  }
}
