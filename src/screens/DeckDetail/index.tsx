import React, { FC, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';
import { useDispatch, useSelector } from 'react-redux';
import { Animated, StyleSheet, View } from 'react-native';
import { DeckDetailScreenRouteProp, Screens } from '../../navigation/types';
import Cards from './components/Cards';
import { getPlatformDimension, isIOS, isSmallDevice, SPACING, WINDOW_HEIGHT } from '../../utils/device';
import IconButton from '../../common/IconButton';
import { CloseButton, Container, GeneralAlert, NoContentInfo, Title } from '../../common';
import { selectBadAnswers, selectDeckItem, selectGoodAnswers } from '../../redux/seclectors';
import { getDeckByShareId, shuffleCards, sortByRankCards } from '../../redux/decks/actions';
import TopContent from './components/TopContent';
import { theme } from '../../utils';
import ActionButtons from './components/ActionButtons';
import useOpacity from './useOpacity';
import { RootState } from '../../redux/store';
import { GeneralAlertRef, NotificationMessages } from '../../common/GeneralAlert';
import { useIsMount } from "../../utils/useIsMount";

const TOP_HEADER_HEIGHT = WINDOW_HEIGHT * 0.3;
const TOP_HEADER_HEIGHT_SPACING = TOP_HEADER_HEIGHT - (isSmallDevice() ? 0 : 30);

// Note: why there is a IOS and Android content? SharedElement wasn't working on Android, this is why it is handled differently - FIXME: upgrade react-navigation-shared-element
export interface Props {
  route: DeckDetailScreenRouteProp;
}

const DeckDetail: FC<Props> = ({
  route: {
    params: { id, color },
  },
}) => {
  const isMount = useIsMount();
  const { opacityVal } = useOpacity();
  const dispatch = useDispatch();
  const { navigate, goBack } = useNavigation();
  const deckDetail = useSelector(selectDeckItem(id));
  const badAnswers = useSelector(selectBadAnswers(id));
  const goodAnswers = useSelector(selectGoodAnswers(id));
  const { isLoading, error } = useSelector((state: RootState) => state.decks);

  const alertRef = useRef<GeneralAlertRef>(null);

  useEffect(() => {
    if(isLoading || isMount) {
      return;
    }

    if (error || !isLoading) {
      alertRef.current?.startAnimation()
    }

  }, [isLoading, error])

  const handleOnPress = () => navigate(Screens.QUESTION_MODAL, { title: deckDetail.title, deckId: id });

  const navigateToPlayground = () =>
    navigate(Screens.PLAYGROUND, { deckId: id, cardId: deckDetail.cards[0].id });

  const handleSortCards = () => dispatch(sortByRankCards(id));

  const handleShuffleCards = () => dispatch(shuffleCards(id));

  const handlerRefreshSharedDeck = () => {
    if (deckDetail.sharedWithYou || deckDetail.sharedByYou) {
      dispatch(getDeckByShareId(deckDetail.shareId, id));
    }
  };

  return (
    <Container>
      <GeneralAlert text={error ? NotificationMessages.ERROR : NotificationMessages.UPDATE} ref={alertRef} />
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
        goodAnswersTotal={goodAnswers}
      />
      {isIOS ? (
        <SharedElement
          id="general.bg"
          style={[StyleSheet.absoluteFillObject, { transform: [{ translateY: WINDOW_HEIGHT + 30 }] }]}>
          <View style={[StyleSheet.absoluteFillObject, styles.dummy]}>
            <Animated.View style={{ opacity: opacityVal }}>
              {deckDetail.cards.length ? (
                <ActionButtons
                  navigate={navigateToPlayground}
                  shuffle={handleShuffleCards}
                  sort={handleSortCards}
                />
              ) : (
                <NoContentInfo text="card" style={styles.noContentInfo} iconName="prettyLady" />
              )}
              <Cards
                cards={deckDetail.cards}
                deckId={id}
                isOwner={deckDetail.isOwner}
                handlerRefreshSharedDeck={handlerRefreshSharedDeck}
                isLoading={isLoading}
              />
            </Animated.View>
          </View>
        </SharedElement>
      ) : (
        <View style={styles.androidList}>
          {deckDetail.cards.length ? (
            <ActionButtons
              navigate={navigateToPlayground}
              shuffle={handleShuffleCards}
              sort={handleSortCards}
            />
          ) : (
            <NoContentInfo text="card" style={styles.noContentInfo} iconName="prettyLady" />
          )}
          <Cards
            cards={deckDetail.cards}
            deckId={id}
            isOwner={deckDetail.sharedByYou}
            handlerRefreshSharedDeck={handlerRefreshSharedDeck}
            isLoading={isLoading}
          />
        </View>
      )}
      {(deckDetail.sharedWithYou || deckDetail.sharedByYou) && !isLoading ? (
        <View style={styles.refresh}>
          <IconButton onPress={handlerRefreshSharedDeck} iconName="refresh" />
        </View>
      ) : null}
    </Container>
  );
};

const styles = StyleSheet.create({
  addIcon: {
    right: 10,
    position: 'absolute',
    top: getPlatformDimension(20, 20, 50),
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
  androidList: {
    flex: 1,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: SPACING,
    backgroundColor: 'white',
  },
  refresh: {
    position: 'absolute',
    bottom: getPlatformDimension(10, 10, 20),
    left: 10,
  },
  noContentInfo: {
    marginTop: WINDOW_HEIGHT / 6,
  },
});

export default DeckDetail;
