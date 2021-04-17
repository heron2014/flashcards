import React, { FC, useRef, useState } from 'react';
import { Animated, View, StyleSheet, TextInput, GestureResponderEvent, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { SPACING } from '../../../utils/device';
import { SharedElement } from 'react-navigation-shared-element';
import IconButton from '../../../common/IconButton';
import { saveDeck } from '../../../redux/decks/actions';
import assets from '../../../assets';
import { theme } from '../../../utils';
import { Bubble, TouchableScale, AppText } from '../../../common';

// const colors = ['#fc9d9a', '#f9cdad', '#c8c8a9', '#83af9b', '#d6e1c7', '#94c7b6'];
// const colors = ['#e1d1a6', '#fc9d9a', '#f9cdad', '#d6e1c7', '#94c7b6', '#c9e4d3', '#d9dbed'];
const colors = theme.colors.list;
const ITEM_HEIGHT = 120;
export const CARD_HEIGHT = ITEM_HEIGHT + SPACING;

interface Props {
  item: string;
  index: number;
  scrollY: Animated.Value;
  title: string | undefined;
  totalCards: number;
  goodAnswers: number;
  onPress: (event: GestureResponderEvent) => void;
  onNavigate: (event: GestureResponderEvent) => void;
  sharedWithYou: boolean;
}

const DeckItem: FC<Props> = ({
  item,
  index,
  scrollY,
  title,
  totalCards,
  goodAnswers,
  onPress,
  onNavigate,
  sharedWithYou,
}) => {
  const dispatch = useDispatch();
  const [newTitle, setNewTitle] = useState(title);
  const inputRef = useRef<TextInput>(null);
  const handleSaveDeck = () => (newTitle ? dispatch(saveDeck(item, newTitle)) : null);
  const handleEdit = () => inputRef && inputRef.current && inputRef.current.focus();

  const scale = scrollY.interpolate({
    inputRange: [-1, 0, CARD_HEIGHT * index, CARD_HEIGHT * (index + 2)],
    outputRange: [1, 1, 1, 0.5],
  });

  const opacity = scrollY.interpolate({
    inputRange: [-1, 0, CARD_HEIGHT * index, CARD_HEIGHT * (index + 1)],
    outputRange: [1, 1, 1, 0.5],
  });

  return (
    <TouchableScale onPress={onNavigate}>
      <Animated.View style={[styles.container, { opacity, transform: [{ scale }] }]}>
        <SharedElement id={`item.${item}`} style={[StyleSheet.absoluteFillObject]}>
          <View
            style={[
              StyleSheet.absoluteFillObject,
              { backgroundColor: colors[index % colors.length], borderRadius: 4 },
            ]}
          />
        </SharedElement>
        {sharedWithYou ? (
          <View style={styles.bubble}>
            <Bubble />
          </View>
        ) : null}
        <View style={styles.button}>
          <IconButton
            onPress={onPress}
            iconName="trash"
            imgStyle={styles.transparentIconImg}
            style={{ ...transparentIcon, marginRight: 10 }}
            hasShadow={false}
          />
          <IconButton
            onPress={handleEdit}
            iconName="edit"
            imgStyle={styles.transparentIconImg}
            style={styles.transparentIcon}
            hasShadow={false}
          />
        </View>
        <TextInput
          ref={inputRef}
          onEndEditing={handleSaveDeck}
          blurOnSubmit
          style={styles.input}
          value={newTitle}
          onChangeText={setNewTitle}
          placeholder="New Deck Name"
          selectionColor="#222"
        />
        <Image source={assets.icons.strokeBlack} resizeMode="contain" style={styles.stroke} />
        <View style={styles.bottom}>
          <AppText size="p">
            {totalCards} {totalCards === 1 ? 'card' : 'cards'}
          </AppText>
          <AppText size="p">
            {goodAnswers} / {totalCards}
          </AppText>
        </View>
      </Animated.View>
    </TouchableScale>
  );
};

const transparentIcon = {
  backgroundColor: 'transparent',
  borderWidth: 0.5,
  borderColor: '#222',
  width: 30,
  height: 30,
  shadowColor: 'transparent',
};

const styles = StyleSheet.create({
  container: {
    height: ITEM_HEIGHT,
    padding: SPACING,
    marginBottom: SPACING,
    ...theme.iconButtonShadow,
  },
  input: {
    color: '#222',
    fontWeight: 'bold',
    marginTop: 10,
    height: 40,
    borderColor: 'black',
    borderRadius: 0,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 18,
  },
  button: {
    position: 'absolute',
    flexDirection: 'row',
    top: 5,
    right: 10,
    alignSelf: 'flex-end',
  },
  bubble: {
    position: 'absolute',
    top: -5,
    left: -5,
  },
  stroke: {
    width: '100%',
    height: 5,
    marginTop: -5,
    resizeMode: 'contain',
  },
  transparentIcon: {
    ...transparentIcon,
  },
  transparentIconImg: {
    width: 18,
    height: 18,
  },
  bottom: {
    flexDirection: 'row',
    marginTop: 30,
    marginLeft: 5,
    justifyContent: 'space-between',
  },
});

export default DeckItem;
