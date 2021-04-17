import React, { FC } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, GestureResponderEvent } from 'react-native';
import AppText from './AppText';

interface Props {
  selected: boolean;
  onPress: (e: GestureResponderEvent) => void;
  title: string;
}

const RadioButton: FC<Props> = ({ selected, onPress, title }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={styles.container}>
      <View style={styles.inner}>{selected ? <View style={styles.subContainer} /> : null}</View>
      <AppText size="body">{title}</AppText>
    </View>
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
  inner: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  subContainer: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#000',
  },
});

export default RadioButton;
