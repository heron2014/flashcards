import React, { FC, useRef } from 'react';
import { View, StyleSheet, Animated, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { isIOS, WINDOW_WIDTH } from '../../styles/utils';
import { Card } from '../../redux/reducer';
import { Screens } from '../../navigation/interface';
import { HtmlParser, IconButton } from '../../common';

const ITEM_SIZE = isIOS ? WINDOW_WIDTH * 0.85 : WINDOW_WIDTH * 0.74;

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

  const handleScore = () => {
    console.log('score');
    navigation.navigate(Screens.ALERT);
  };

  return (
    <>
      <View style={styles.scoreButton}>
        <IconButton onPress={handleScore} iconName="add" />
      </View>
      <View style={styles.editButton}>
        <IconButton onPress={handleEdit} iconName="edit" />
      </View>
      <View style={styles.innerContainer}>
        <ScrollView>
          <TouchableWithoutFeedback onPress={flipCard}>
            <View>
              <Animated.View style={[styles.card, { transform: [{ rotateY: frontInterpolate }, { perspective: 1000 }] }]}>
                <HtmlParser text={card.question} />
              </Animated.View>
              <Animated.View
                style={[styles.card, styles.cardBack, { transform: [{ rotateY: backInterpolate }, { perspective: 1000 }] }]}>
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
    minHeight: ITEM_SIZE * 1.6,
    backgroundColor: 'gray',
    backfaceVisibility: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBack: {
    position: 'absolute',
    top: 0,
  },
  innerContainer: {
    width: '100%',
    height: ITEM_SIZE * 1.6,
    borderRadius: 4,
    backgroundColor: '#94c7b6',
    margin: 0,
    marginBottom: 10,
  },
  editButton: {
    position: 'absolute',
    top: 2,
    right: 5,
    zIndex: 999999,
  },
  scoreButton: {
    position: 'absolute',
    top: 2,
    left: 5,
    zIndex: 999999,
  },
});

export default CardItem;
