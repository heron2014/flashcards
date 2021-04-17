import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { theme } from '../utils';
import AppText from './AppText';

const ProgressLoader = ({ progress }: { progress: number }) => (
  <View style={styles.container}>
    <ActivityIndicator color={theme.colors.border} size="large" />
    <AppText size="h2">{`${progress}%`}</AppText>
  </View>
);

const styles = StyleSheet.create({
  container: {
    zIndex: 999,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 10,
  },
});

export default ProgressLoader;
