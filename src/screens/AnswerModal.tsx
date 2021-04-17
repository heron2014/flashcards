import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddAnswerScreenNavigationProp, AddAnswerScreenRouteProp } from '../navigation/types';
import { CloseButton, Container, Form, Title } from 'common';
import { selectCard, selectDeckItem } from '../redux/seclectors';
import { Card } from '../redux/decks/reducer';
import { editAndSaveSharedDeck, saveAnswer } from '../redux/decks/actions';

export interface Props {
  route: AddAnswerScreenRouteProp;
  navigation: AddAnswerScreenNavigationProp;
}

const AnswerModal: FC<Props> = ({ route: { params }, navigation }) => {
  const { title, deckId, cardId } = params;
  const card = useSelector(selectCard(deckId, cardId));
  const deckDetail = useSelector(selectDeckItem(deckId));
  const dispatch = useDispatch();

  const handleSave = async (answer: Card['answer']) => {
    dispatch(saveAnswer(deckId, cardId, answer));
    if (deckDetail.sharedByYou || deckDetail.sharedWithYou || deckDetail.owner) {
      dispatch(editAndSaveSharedDeck(deckId, deckDetail.shareId));
    }
    navigation.popToTop();
  };

  const handleCloseModal = () => navigation.popToTop();

  return (
    <Container>
      <Title title={title} />
      <CloseButton onPress={handleCloseModal} />
      <Form
        placeholder="Type an answer"
        initialValue={card?.answer || ''}
        onSubmit={(answer) => handleSave(answer)}
      />
    </Container>
  );
};

export default AnswerModal;
