import {
  MonthlySubscription,
  OneUnlimitedDeck,
  RemoveAds,
  ShopActionsTypes,
  ThreeUnlimitedDeck,
  YearlySubscription,
} from './interface';

export const getOneUnlimitedDeck = (id: 'oneUnlimitedDeck'): OneUnlimitedDeck => ({
  type: ShopActionsTypes.ONE_UNLIMITED_DECK,
  id,
});

export const getThreeUnlimitedDecks = (id: 'threeUnlimitedDecks'): ThreeUnlimitedDeck => ({
  type: ShopActionsTypes.THREE_UNLIMITED_DECKS,
  id,
});

export const removeAds = (id: 'removeAds'): RemoveAds => ({
  type: ShopActionsTypes.REMOVE_ADS,
  id,
});

export const setMonthlySubscription = (id: 'monthlySubscription'): MonthlySubscription => ({
  type: ShopActionsTypes.MONTHLY_SUBSCRIPTION,
  id,
});

export const setYearlySubscription = (id: 'yearlySubscription'): YearlySubscription => ({
  type: ShopActionsTypes.YEARLY_SUBSCRIPTION,
  id,
});
