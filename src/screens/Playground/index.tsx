import React, { FC, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Swiper from 'react-native-deck-swiper';
import * as R from 'ramda';
import { PlaygroundScreenNavigationProp, PlaygroundScreenRouteProp, Screens } from '../../navigation/types';
import { CloseButton, Container, Title } from '../../common';
import { selectDeckItem } from '../../redux/seclectors';
import CardItem from './Card';
import { Card } from '../../redux/decks/reducer';
import { getPlatformDimension, isIOS, isSmallDevice } from '../../utils/device';
import { scoreCard } from '../../redux/decks/actions';
import { SCORES } from '../../redux/decks/interface';
import ActionButtons from './ActionButtons';
import NoMoreCards from './NoMoreCards';
import { theme } from '../../utils';
import PrimaryButton from '../../common/PrimaryButton';
import { RootState } from '../../redux/store';
import { triggerRateApp } from '../../redux/user/actions';
import rateApp from '../../modules/rateApp';
import { useInterstitialAd } from '../../service/useInterstitialAd';
import { AdUnitIds } from '../../service/config';

export interface Props {
  route: PlaygroundScreenRouteProp;
  navigation: PlaygroundScreenNavigationProp;
}

const STACK_SIZE = 3;

const AD_ID = isIOS ? AdUnitIds.IOS_PRE_PLAYGROUND_PROMO : AdUnitIds.ANDROID_PRE_PLAYGROUND_PROMO;

const Playground: FC<Props> = ({ route: { params }, navigation: { goBack, navigate } }) => {
  const swiperRef = useRef<any>(null); // FIXME
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const [noMoreCards, setNoMoreCards] = useState(false);
  const deckDetail = useSelector(selectDeckItem(params.deckId));
  const { ratedAppAt } = useSelector((state: RootState) => state.user);
  const card = R.find(R.propEq('id', params.cardId), deckDetail.cards);
  const restOfCards = R.reject(R.propEq('id', params.cardId), deckDetail.cards);
  const reOrderedCards = card ? [card, ...restOfCards] : deckDetail.cards; // First card is the one which has been clicked from deck detail

  useInterstitialAd(AD_ID);

  const onSwiped = () => {
    setIndex((index + 1) % deckDetail.cards.length);
  };

  const handleShareDeck = () =>
    navigate(Screens.ALERT, { modalTemplate: 'shareModal', deckId: params.deckId });

  const renderCard = (item: Card) => <CardItem card={item} title={deckDetail.title} deckId={params.deckId} />;

  const scoreGoodAnswer = (i: number) => {
    const currentCard = deckDetail.cards[i];
    dispatch(scoreCard(params.deckId, currentCard.id, SCORES.GOOD));
  };

  const scoreBadAnswer = (i: number) => {
    const currentCard = deckDetail.cards[i];
    dispatch(scoreCard(params.deckId, currentCard.id, SCORES.BAD));
  };

  const handlePressRight = () => {
    if (swiperRef) {
      swiperRef.current.swipeRight();
      scoreGoodAnswer(index);
    }
  };

  const handlePressLeft = () => {
    swiperRef.current.swipeLeft();
    scoreBadAnswer(index);
  };

  const handleSwipeRight = (currentIndex: number) => scoreGoodAnswer(currentIndex);
  const handleSwipeLeft = (currentIndex: number) => scoreBadAnswer(currentIndex);
  const handleGoBack = () => {
    if (deckDetail.cards.length && !ratedAppAt) {
      dispatch(triggerRateApp());
      rateApp(true);
    }
    goBack();
  };

  const renderCards = () => {
    if (noMoreCards) {
      return <NoMoreCards deckId={params.deckId} />;
    }

    return (
      <Swiper
        ref={swiperRef}
        cards={reOrderedCards}
        cardIndex={index}
        renderCard={renderCard}
        backgroundColor={'transparent'}
        onSwiped={onSwiped}
        onTapCard={() => null}
        cardVerticalMargin={10}
        stackSize={STACK_SIZE}
        stackScale={10}
        verticalSwipe={false}
        stackSeparation={30}
        onSwipedRight={handleSwipeRight}
        onSwipedLeft={handleSwipeLeft}
        animateOverlayLabelsOpacity
        animateCardOpacity
        disableTopSwipe
        disableBottomSwipe
        overlayLabels={theme.playgroundOverlayButtons}
        onSwipedAll={() => setNoMoreCards(true)}
      />
    );
  };
  return (
    <Container style={styles.container}>
      <CloseButton onPress={handleGoBack} />
      <Title title={deckDetail.title} />
      {deckDetail.isOwner && (
        <View style={styles.shareButtonContainer}>
          <PrimaryButton buttonText="Share" onPress={handleShareDeck} />
        </View>
      )}
      <View style={styles.swiperContainer}>
        {renderCards()}
        {!noMoreCards ? (
          <ActionButtons onPressLeft={handlePressLeft} onPressRight={handlePressRight} />
        ) : null}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background2,
  },
  swiperContainer: {
    flex: 1,
    marginTop: isSmallDevice() ? 15 : getPlatformDimension(30, 20, 40),
  },
  shareButtonContainer: {
    width: 60,
    right: 10,
    position: 'absolute',
    top: getPlatformDimension(20, 15, 40, 20),
    zIndex: 999,
  },
});

export default Playground;
