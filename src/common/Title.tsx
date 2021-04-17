import React from 'react';
import AppText from './AppText';
import { StyleSheet, View } from 'react-native';
import { getPlatformDimension } from '../utils/device';

const Title = ({ title }: { title: string }) => (
  <View style={styles.container}>
    <AppText size="header" centered ellipsizeMode="tail" numberOfLines={1}>
      {title}
    </AppText>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingTop: getPlatformDimension(25, 10, 15),
    paddingHorizontal: 70,
  },
});

export default Title;
