import { Options } from 'react-native-share';

export const shareOptions: Options = {
  url: 'https://myflashcards.app',
  message: 'Check out a new app called MyFlashCards.\nIt is a great tool to learn faster!',
  title: '',
  subject: 'Learn with MyFlashcards',
  saveToFiles: false,
};

export const shareOptionsWithCode = (code: string): Options => ({
  url: 'https://myflashcards.app',
  message: `Install MyFlashCards App.\n Learn with me! \nUse this passcode: ${code} to get access to my deck`,
  title: '',
  subject: 'Learn with MyFlashCards',
  saveToFiles: false,
});

export const TERMS =
  'Payment will be charged to your iTunes Account at confirmation of purchase. Account will be ' +
  'charged for renewal within 24-hours prior to the end of the current period at your chosen ' +
  "subscription's monthly price. Subscription automatically renews unless auto-renew is turned off at " +
  'least 24-hours before the end of the current period. Subscriptions may be managed by the user and ' +
  "auto-renewal may be turned off by going to the user's Account Settings after purchase. For more " +
  'information, see our TERMS OF USE and PRIVACY POLICY.';
