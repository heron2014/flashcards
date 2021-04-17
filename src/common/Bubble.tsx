import React from 'react';
import AppText from './AppText';
import { StyleSheet, View } from 'react-native';
import { theme } from '../utils';

const Bubble = ({ text = 'shared' }) => (
  <View style={styles.container}>
    <AppText size="p">{text}</AppText>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: 60,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 10,
    backgroundColor: theme.colors.good,
  },
});

export default Bubble;
