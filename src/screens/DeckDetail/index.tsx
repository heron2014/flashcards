import React, { FC, useEffect, useRef } from 'react';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';
import { useDispatch, useSelector } from 'react-redux';
import { Animated, StyleSheet, View } from 'react-native';
import { RootStackParamList, Screens } from '../../navigation/interface';
import Cards from './components/Cards';
import { getPlatformDimension, isIOS, isSmallDevice, SPACING, WINDOW_HEIGHT } from '../../utils/device';
import IconButton from '../../common/IconButton';
import { CloseButton, Container, Title } from '../../common';
import { selectBadAnswers, selectDeckItem } from '../../redux/seclectors';
import { reorderCards } from '../../redux/actions';
import TopContent from './components/TopContent';
import { theme } from '../../utils';
import NoCardsText from './components/NoCardsText';
import ActionButtons from './components/ActionButttons';

type DeckDetailScreenRouteProp = RouteProp<RootStackParamList, Screens.DECK_DETAIL>;

const TOP_HEADER_HEIGHT = WINDOW_HEIGHT * 0.3;

const TOP_HEADER_HEIGHT_SPACING = TOP_HEADER_HEIGHT - (isSmallDevice() ? 0 : 30);

export interface Props {
  route: DeckDetailScreenRouteProp;
}

const DeckDetail: FC<Props> = ({
  route: {
    params: { id, color },
  },
}) => {
  const opacityVal = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const deckDetail = useSelector(selectDeckItem(id));
  const badAnswers = useSelector(selectBadAnswers(id));
  const { navigate, goBack } = useNavigation();

  useEffect(() => {
    Animated.timing(opacityVal, {
      toValue: 1,
      delay: 200,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [opacityVal]);

  const handleOnPress = () => navigate(Screens.QUESTION_MODAL, { title: deckDetail.title, deckId: id });

  const navigateToPlayground = () => {
    navigate(Screens.PLAYGROUND, { deckId: id, cardId: deckDetail.cards[0].id });
  };

  const shuffleCards = () => {
    return dispatch(reorderCards(id));
  };

  return (
    <Container>
      <CloseButton onPress={goBack} />
      <View style={styles.addIcon}>
        <IconButton onPress={handleOnPress} iconName="plusCurve" />
      </View>
      <SharedElement id={`item.${id}`} style={StyleSheet.absoluteFillObject}>
        <View style={[StyleSheet.absoluteFillObject, styles.topView, { backgroundColor: color }]} />
      </SharedElement>
      <Title title={deckDetail.title} />
      <TopContent
        total={deckDetail.cards.length}
        badAnswersTotal={badAnswers}
        goodAnswersTotal={deckDetail.cards.length - badAnswers}
      />
      {isIOS ? (
        <SharedElement
          id="general.bg"
          style={[StyleSheet.absoluteFillObject, { transform: [{ translateY: WINDOW_HEIGHT + 30 }] }]}>
          <View style={[StyleSheet.absoluteFillObject, styles.dummy]}>
            <Animated.View style={{ opacity: opacityVal }}>
              {deckDetail.cards.length ? (
                <ActionButtons navigate={navigateToPlayground} shuffle={shuffleCards} />
              ) : (
                <NoCardsText />
              )}
              <Cards cards={deckDetail.cards} deckId={id} />
            </Animated.View>
          </View>
        </SharedElement>
      ) : (
        <Cards cards={deckDetail.cards} deckId={id} />
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  addIcon: {
    right: 10,
    position: 'absolute',
    top: getPlatformDimension(20, 20, 5),
    zIndex: 9,
  },
  topView: {
    borderRadius: 0,
    height: TOP_HEADER_HEIGHT + 60,
  },
  dummy: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'white',
    transform: [{ translateY: -WINDOW_HEIGHT + TOP_HEADER_HEIGHT_SPACING }],
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderColor: theme.colors.lightBorder,
    borderWidth: 0.5,
    paddingTop: SPACING,
    paddingHorizontal: 5,
    paddingBottom: SPACING + 10,
  },
});

export default DeckDetail;
