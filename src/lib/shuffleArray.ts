// Credit goes to https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
import { Card } from '../redux/decks/reducer';

// FIXME: add generics types
interface Datum {
  [k: string]: boolean | number | string | object;
}

type Data = Datum[];

const shuffleArray = function (array: Card[]) {
  const a = array.slice(0);

  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }

  return a;
};

export default shuffleArray;
