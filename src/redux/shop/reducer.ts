import { ShopActions, ShopActionsTypes } from './interface';

type ProductType =
  | 'oneUnlimitedDeck'
  | 'threeUnlimitedDecks'
  | 'removeAds'
  | 'monthlySubscription'
  | 'yearlySubscription';

interface Product {
  date: number;
  expireAt: string | null;
}

export type ShopState = {
  [key in ProductType]?: Product;
};

const initialState: ShopState = {};

export const shop = (state = initialState, action: ShopActions): ShopState => {
  switch (action.type) {
    case ShopActionsTypes.ONE_UNLIMITED_DECK:
    case ShopActionsTypes.THREE_UNLIMITED_DECKS:
    case ShopActionsTypes.REMOVE_ADS:
    case ShopActionsTypes.MONTHLY_SUBSCRIPTION:
    case ShopActionsTypes.YEARLY_SUBSCRIPTION: {
      return {
        ...state,
        [action.id]: { date: Date.now(), expireAt: null },
      };
    }
    default:
      return state;
  }
};
