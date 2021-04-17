import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, AppText } from '../../../common';

interface Props {
  label: string;
  text: string;
  icon: 'cardsWithPen' | 'decks' | 'noAds' | 'toolbar';
}

const Item: FC<Props> = ({ icon, label, text }) => (
  <View style={styles.container}>
    <Icon name={icon} />
    <View style={styles.inner}>
      <AppText size="h2" textStyle={styles.text}>
        {label}
      </AppText>
      <AppText size="p">{text}</AppText>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 12,
  },
  inner: {
    marginLeft: 5,
  },
  text: {
    fontWeight: 'bold',
  },
});

export default Item;
