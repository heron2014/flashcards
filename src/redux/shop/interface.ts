export enum ShopActionsTypes {
  ONE_UNLIMITED_DECK = 'ONE_UNLIMITED_DECK',
  THREE_UNLIMITED_DECKS = 'THREE_UNLIMITED_DECKS',
  REMOVE_ADS = 'REMOVE_ADS',
  MONTHLY_SUBSCRIPTION = 'MONTHLY_SUBSCRIPTION',
  YEARLY_SUBSCRIPTION = 'YEARLY_SUBSCRIPTION',
}

export interface OneUnlimitedDeck {
  type: typeof ShopActionsTypes.ONE_UNLIMITED_DECK;
  id: 'oneUnlimitedDeck';
}

export interface ThreeUnlimitedDeck {
  type: typeof ShopActionsTypes.THREE_UNLIMITED_DECKS;
  id: 'threeUnlimitedDecks';
}

export interface RemoveAds {
  type: typeof ShopActionsTypes.REMOVE_ADS;
  id: 'removeAds';
}

export interface MonthlySubscription {
  type: typeof ShopActionsTypes.MONTHLY_SUBSCRIPTION;
  id: 'monthlySubscription';
}

export interface YearlySubscription {
  type: typeof ShopActionsTypes.YEARLY_SUBSCRIPTION;
  id: 'yearlySubscription';
}

export type ShopActions =
  | OneUnlimitedDeck
  | ThreeUnlimitedDeck
  | RemoveAds
  | MonthlySubscription
  | YearlySubscription;
