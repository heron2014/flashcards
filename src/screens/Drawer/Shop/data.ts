import { Product } from 'react-native-iap';

interface IData {
  label: string;
  id: Product['productId'];
  price: string;
}

export const data: IData[] = [
  {
    label: '1 Unlimited deck',
    id: 'one_unlimited_deck',
    price: '£0.99',
  },
  {
    label: '3 Unlimited decks',
    id: 'three_unlimited_decks',
    price: '£1.99',
  },
  {
    label: 'Remove ads',
    id: 'remove_ads',
    price: '£1.99',
  },
  {
    label: 'Get free deck',
    id: 'get_free',
    price: '0',
  },
];
