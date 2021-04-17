import { GestureResponderEvent, StyleSheet, View } from 'react-native';
import IconButton from './IconButton';
import React, { FC } from 'react';
import { getPlatformDimension } from '../utils/device';

interface Props {
  onPress: (e: GestureResponderEvent) => void;
}

const CloseButton: FC<Props> = ({ onPress }) => (
  <View style={styles.container}>
    <IconButton onPress={onPress} iconName="x" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    left: 10,
    position: 'absolute',
    top: getPlatformDimension(20, 20, 50), // Dont like this
    zIndex: 9,
  },
});

export default CloseButton;
