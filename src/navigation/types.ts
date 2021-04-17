import { Card, Deck } from '../redux/decks/reducer';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

export enum Screens {
  HOME = 'Home',
  DECK_DETAIL = 'DeckDetails',
  QUESTION_MODAL = 'QuestionModal',
  ANSWER_MODAL = 'AnswerModal',
  PLAYGROUND = 'Playground',
  ALERT = 'Alert',
  DRAWER = 'Drawer',
  GET_FREEBIE = 'GetFreebie',
  RATE_APP = 'RateApp',
  ADD_DECK = 'AddDeck',
  SHARE_APP = 'ShareApp',
  UPGRADE = 'Upgrade',
  REQUEST_FEATURE = 'RequestFeature',
  CONTACT = 'Contact',
  IMPROVE_APP = 'ImproveApp',
  SHOP = 'Shop',
  UPGRADE_TO_PRO_MODAL = 'UpgradeToProModal',
  SHOP_MODAL = 'ShopModal',
  GET_FREEBIE_MODAL = 'GetFreebieModal',
}

export type ModalTemplate = 'shareModal' | 'alertModal' | 'codeModal';

export type RootStackParamList = {
  [Screens.HOME]: undefined;
  [Screens.QUESTION_MODAL]: { title: Deck['title']; deckId: string; cardId?: Card['id'] };
  [Screens.ANSWER_MODAL]: { title: Deck['title']; deckId: string; cardId: Card['id'] };
  [Screens.DECK_DETAIL]: { id: string; color: string };
  [Screens.PLAYGROUND]: { deckId: string; cardId: Card['id'] };
  [Screens.ALERT]: { modalTemplate: ModalTemplate; deckId: string };
  [Screens.ADD_DECK]: undefined;
  [Screens.UPGRADE_TO_PRO_MODAL]: undefined;
};

export type HomeStackParams = {
  [Screens.HOME]: undefined;
  [Screens.DECK_DETAIL]: { id: string; color: string };
};

export type DrawerStackParamList = {
  [Screens.DRAWER]: undefined;
  [Screens.HOME]: undefined;
  [Screens.GET_FREEBIE]: undefined;
  [Screens.RATE_APP]: undefined;
  [Screens.SHARE_APP]: undefined;
  [Screens.UPGRADE]: undefined;
  [Screens.REQUEST_FEATURE]: undefined;
  [Screens.CONTACT]: undefined;
  [Screens.IMPROVE_APP]: undefined;
  [Screens.SHOP]: undefined;
};

export type ShopStackParamList = {
  [Screens.UPGRADE_TO_PRO_MODAL]: undefined;
  [Screens.SHOP_MODAL]: undefined;
  [Screens.GET_FREEBIE_MODAL]: undefined;
};

export type DrawerScreenNavigationProp = DrawerNavigationProp<DrawerStackParamList, Screens.DRAWER>;
export type GetFreebieScreenNavigationProp = StackNavigationProp<DrawerStackParamList, Screens.UPGRADE>;
export type AddAnswerScreenRouteProp = RouteProp<RootStackParamList, Screens.ANSWER_MODAL>;
export type AddAnswerScreenNavigationProp = StackNavigationProp<RootStackParamList, Screens.ANSWER_MODAL>;
export type UpgradeScreenNavigationProp = StackNavigationProp<DrawerStackParamList, Screens.UPGRADE>;
export type ShopStackNavigationProp = StackNavigationProp<ShopStackParamList, Screens.UPGRADE_TO_PRO_MODAL>;
export type ShopScreenNavigationProp = StackNavigationProp<DrawerStackParamList, Screens.SHOP>;
export type PlaygroundScreenRouteProp = RouteProp<RootStackParamList, Screens.PLAYGROUND>;
export type PlaygroundScreenNavigationProp = StackNavigationProp<RootStackParamList, Screens.PLAYGROUND>;
export type AlertScreenNavigationProp = StackNavigationProp<RootStackParamList, Screens.ALERT>;
export type AlertScreenRouteProp = RouteProp<RootStackParamList, Screens.ALERT>;
export type AddQuestionScreenRouteProp = RouteProp<RootStackParamList, Screens.QUESTION_MODAL>;
export type AddQuestionScreenNavigationProp = StackNavigationProp<RootStackParamList, Screens.QUESTION_MODAL>;
export type DeckDetailScreenRouteProp = RouteProp<RootStackParamList, Screens.DECK_DETAIL>;
export type AddDeckScreenNavigationProp = StackNavigationProp<RootStackParamList, Screens.ADD_DECK>;
