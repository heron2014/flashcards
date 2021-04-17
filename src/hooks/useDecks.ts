import { useDispatch, useSelector } from 'react-redux';
import { deleteDeck } from '../redux/decks/actions';
import { selectDecks } from '../redux/seclectors';
import { NativeAlert } from '../common';

const useDecks = () => {
  const decks = useSelector(selectDecks);
  const dispatch = useDispatch();

  const handleRemoveDeck = (item: string) => () => {
    NativeAlert('Are you sure you want to delete this deck?', () => {
      dispatch(deleteDeck(item));
    });
  };

  return {
    decks,
    decksIds: Object.keys(decks),
    handleRemoveDeck,
  };
};

export default useDecks;
