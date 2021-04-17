import {
  getOneUnlimitedDeck,
  getThreeUnlimitedDecks,
  removeAds,
  setMonthlySubscription,
  setYearlySubscription,
} from '../redux/shop/actions';
import { addFreeDeck } from '../redux/decks/actions';

export enum ProductsIds {
  ONE_UNLIMITED_DECK = 'one_unlimited_deck',
  THREE_UNLIMITED_DECKS = 'three_unlimited_decks',
  REMOVE_ADS = 'remove_ads',
  MONTHLY_SUBSCRIPTION = 'monthly_subscription',
  YEARLY_SUBSCRIPTION = 'yearly_subscription',
}

export enum DecksToGive {
  ONE_UNLIMITED_DECK = 1,
  THREE_UNLIMITED_DECKS = 3,
}

export const itemSkus = [
  ProductsIds.ONE_UNLIMITED_DECK,
  ProductsIds.THREE_UNLIMITED_DECKS,
  ProductsIds.REMOVE_ADS,
  ProductsIds.MONTHLY_SUBSCRIPTION,
  ProductsIds.YEARLY_SUBSCRIPTION,
];

export const dispatchShopActions = (productId: string, dispatch: any) => {
  switch (productId) {
    case ProductsIds.ONE_UNLIMITED_DECK: {
      dispatch(getOneUnlimitedDeck('oneUnlimitedDeck'));
      dispatch(addFreeDeck(1));
      break;
    }
    case ProductsIds.THREE_UNLIMITED_DECKS: {
      dispatch(getThreeUnlimitedDecks('threeUnlimitedDecks'));
      dispatch(addFreeDeck(3));
      break;
    }
    case ProductsIds.REMOVE_ADS:
      return dispatch(removeAds('removeAds'));
    case ProductsIds.MONTHLY_SUBSCRIPTION: {
      dispatch(setMonthlySubscription('monthlySubscription'));
      dispatch(addFreeDeck(9999)); // Infinity is not supported by redux-persist, sets back to null https://github.com/rt2zz/redux-persist/issues/290
      break;
    }
    case ProductsIds.YEARLY_SUBSCRIPTION: {
      dispatch(setYearlySubscription('yearlySubscription'));
      dispatch(addFreeDeck(9999));
      break;
    }
    default:
      return null;
  }
};
