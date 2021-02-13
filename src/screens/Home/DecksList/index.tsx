import React, { FC, useEffect, useRef } from 'react';
import { FlatList, StyleSheet, View, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as R from 'ramda';
import { SharedElement } from 'react-navigation-shared-element';
import DeckItem from './DeckItem';
import { Screens } from '../../../navigation/interface';
import { getPlatformDimension, isIOS, moderateScale, SPACING, WINDOW_HEIGHT } from '../../../utils/device';
import useDecks from '../../../hooks/useDecks';
import AddButton from '../../../common/AddButton';
import usePrevious from '../../../hooks/usePrevious';
import { theme } from '../../../utils';
import IconButton from '../../../common/IconButton';

// const colors = ['#e1d1a6', '#fc9d9a', '#f9cdad', '#d6e1c7', '#94c7b6', '#c9e4d3', '#d9dbed'];
const colors = theme.colors.list;

const DecksList: FC = () => {
  const flatListRef = useRef<FlatList>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
    useNativeDriver: true,
  });
  const { navigate, addListener } = useNavigation();
  const { decks, decksIds, handleRemoveDeck } = useDecks();
  const previousDecksIds = usePrevious(decksIds.length);

  const handleOpenModal = () => navigate(Screens.ADD_DECK);

  const handleOpenCodeModal = () => navigate(Screens.ALERT, { modalTemplate: 'codeModal' });

  const renderItem = ({ item, index }: { item: string; index: number }) => {
    const title = R.prop('title', decks[item]);
    const cards = R.prop('cards', decks[item]);
    const goodAnswers = cards.filter((c) => c.rank !== null && c.rank > 0).length;

    const handleNavigate = () =>
      title ? navigate(Screens.DECK_DETAIL, { id: item, color: colors[index % colors.length] }) : null;

    return (
      <DeckItem
        item={item}
        index={index}
        title={title}
        scrollY={scrollY}
        onPress={handleRemoveDeck(item)}
        onNavigate={handleNavigate}
        totalCards={cards.length}
        goodAnswers={goodAnswers}
      />
    );
  };

  useEffect(() => {
    return addListener('focus', () => {
      if (previousDecksIds && decksIds.length > previousDecksIds) {
        flatListRef && flatListRef.current && flatListRef.current.scrollToEnd({ animated: true });
      }
    });
  }, [addListener, decksIds.length, previousDecksIds]);

  return (
    <>
      <Animated.FlatList
        ref={flatListRef}
        contentContainerStyle={styles.flatListContainer}
        scrollEventThrottle={16}
        data={decksIds}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        keyboardShouldPersistTaps="always"
        {...{ onScroll }}
      />
      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          <IconButton onPress={handleOpenCodeModal} iconName="share" style={{ marginRight: 10 }} />
          <AddButton onOpenModal={handleOpenModal} />
        </View>
      </View>
      {isIOS ? (
        <SharedElement
          id="general.bg"
          style={[StyleSheet.absoluteFillObject, { transform: [{ translateY: WINDOW_HEIGHT }] }]}>
          <View style={[StyleSheet.absoluteFillObject, styles.dummy]} />
        </SharedElement>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    padding: SPACING,
    marginTop: 5,
  },
  buttonContainer: {
    position: 'absolute',
    top: getPlatformDimension(20, 20, 50),
    right: moderateScale(16),
  },
  dummy: {
    backgroundColor: 'white',
    transform: [{ translateY: 0 }],
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
  },
  row: {
    flexDirection: 'row',
  },
});

export default DecksList;
