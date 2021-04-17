interface IData {
  icon: 'cardsWithPen' | 'decks' | 'noAds' | 'toolbar';
  label: string;
  text: string;
}

export const data: IData[] = [
  {
    icon: 'decks',
    label: 'Unlock unlimited decks',
    text: 'Create & study unlimited decks',
  },
  {
    icon: 'cardsWithPen',
    label: 'Unlock unlimited cards',
    text: 'Create cards with no limits',
  },
  {
    icon: 'toolbar',
    label: 'Unlock all rich toolbar features',
    text: 'Italic, bold, images and many more...',
  },
  {
    icon: 'noAds',
    label: 'No more ads!',
    text: 'No more distractions by ads',
  },
];
