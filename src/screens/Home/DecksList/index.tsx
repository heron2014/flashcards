import React, { FC, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';
import * as R from 'ramda';
import DeckItem from './DeckItem';
import { Screens } from '../../../navigation/types';
import { getPlatformDimension, isIOS, moderateScale, SPACING, WINDOW_HEIGHT } from '../../../utils/device';
import useDecks from '../../../hooks/useDecks';
import AddButton from '../../../common/AddButton';
import { theme } from '../../../utils';
import IconButton from '../../../common/IconButton';
import NoContentInfo from '../../../common/NoContentInfo';
import { useKeyboard } from '../../../hooks/useKeyboard';

// const colors = ['#e1d1a6', '#fc9d9a', '#f9cdad', '#d6e1c7', '#94c7b6', '#c9e4d3', '#d9dbed'];
const colors = theme.colors.list;

const DecksList: FC = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
    useNativeDriver: true,
  });
  const { navigate } = useNavigation();
  const { decks, decksIds, handleRemoveDeck } = useDecks();
  const { keyboardHeight } = useKeyboard();

  const handleOpenModal = () => navigate(Screens.ADD_DECK);

  const handleOpenCodeModal = () => navigate(Screens.ALERT, { modalTemplate: 'codeModal' });

  const renderItem = ({ item, index }: { item: string; index: number }) => {
    const { title, cards, sharedWithYou } = decks[item];
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
        sharedWithYou={sharedWithYou}
      />
    );
  };

  return (
    <>
      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          <IconButton onPress={handleOpenCodeModal} iconName="codebar" style={{ marginRight: 10 }} />
          <AddButton onOpenModal={handleOpenModal} />
        </View>
      </View>
      {R.isEmpty(decks) ? (
        <NoContentInfo text="flashcard" style={styles.noContentInfo} />
      ) : (
        <>
          <Animated.FlatList
            contentContainerStyle={[styles.flatListContainer, { paddingBottom: keyboardHeight }]}
            scrollEventThrottle={16}
            data={decksIds}
            renderItem={renderItem}
            keyExtractor={(item) => item}
            keyboardShouldPersistTaps="always"
            {...{ onScroll }}
          />
          {isIOS ? (
            <SharedElement
              id="general.bg"
              style={[StyleSheet.absoluteFillObject, { transform: [{ translateY: WINDOW_HEIGHT }] }]}>
              <View style={[StyleSheet.absoluteFillObject, styles.dummy]} />
            </SharedElement>
          ) : null}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    padding: SPACING,
    marginTop: 5,
  },
  buttonContainer: {
    zIndex: 9,
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
  noContentInfo: {
    flex: 1,
    marginTop: -50,
  },
});

export default DecksList;
