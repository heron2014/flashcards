import { GestureResponderEvent, StyleSheet, View } from 'react-native';
import IconButton from './IconButton';
import React, { FC } from 'react';
import { getPlatformDimension } from '../utils/device';

interface Props {
  onPress: (e: GestureResponderEvent) => void;
}

const BackButton: FC<Props> = ({ onPress }) => (
  <View style={styles.container}>
    <IconButton onPress={onPress} iconName="goBack" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    left: 10,
    position: 'absolute',
    top: getPlatformDimension(20, 20, 50), // Dont like this
    zIndex: 99,
  },
});

export default BackButton;
