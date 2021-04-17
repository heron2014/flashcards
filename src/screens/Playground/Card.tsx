import React, { FC, useRef } from 'react';
import { View, StyleSheet, Animated, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { WINDOW_WIDTH } from '../../utils/device';
import { Card } from '../../redux/decks/reducer';
import { Screens } from '../../navigation/types';
import { HtmlParser, IconButton } from '../../common';

const ITEM_SIZE = WINDOW_WIDTH * 0.9;

interface Props {
  card: Card;
  title: string;
  deckId: string;
}

const CardItem: FC<Props> = ({ card, title, deckId }) => {
  const navigation = useNavigation();
  const animatedValue = useRef(new Animated.Value(0)).current;
  let v = 0;
  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });
  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  animatedValue.addListener(({ value }) => {
    v = value;
  });

  const flipCard = () => {
    if (v >= 90) {
      Animated.spring(animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleEdit = () =>
    v <= 90
      ? navigation.navigate(Screens.QUESTION_MODAL, { title, deckId, cardId: card.id })
      : navigation.navigate(Screens.ANSWER_MODAL, { title, deckId, cardId: card.id });

  return (
    <>
      <View style={styles.editButton}>
        <IconButton onPress={handleEdit} iconName="edit" />
      </View>
      <View style={styles.innerContainer}>
        <ScrollView nestedScrollEnabled>
          <TouchableWithoutFeedback onPress={flipCard}>
            <View>
              <Animated.View style={[styles.card, { transform: [{ rotateY: frontInterpolate }] }]}>
                <HtmlParser text={card.question} />
              </Animated.View>
              <Animated.View
                style={[styles.card, styles.cardBack, { transform: [{ rotateY: backInterpolate }] }]}>
                <HtmlParser text={card.answer} />
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    minHeight: ITEM_SIZE * 1.4,
    backgroundColor: 'white',
    backfaceVisibility: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#222',
    borderWidth: 0.5,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  cardBack: {
    position: 'absolute',
    top: 0,
    height: ITEM_SIZE * 1.4,
  },
  innerContainer: {
    width: '100%',
    height: ITEM_SIZE * 1.4 + 5,
    backgroundColor: 'transparent',
    margin: 0,
  },
  editButton: {
    position: 'absolute',
    top: 2,
    right: 5,
    zIndex: 999,
  },
});

export default CardItem;
