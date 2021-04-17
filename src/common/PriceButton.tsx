import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../utils';
import AppText from './AppText';

interface Props {
  onPress: () => void;
  style?: ViewStyle;
  primaryText: string;
  disabled?: boolean;
  isSecondaryText?: boolean;
}

const PriceButton = ({ onPress, style, primaryText, disabled = false, isSecondaryText = true }: Props) => (
  <TouchableOpacity
    disabled={disabled}
    activeOpacity={0.6}
    style={[styles.button, { ...style }]}
    onPress={onPress}>
    <>
      <AppText centered size="body">
        {primaryText}
      </AppText>
      {isSecondaryText && (
        <AppText centered size="p">
          Try free for 3 days
        </AppText>
      )}
    </>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    ...theme.buttonShadow,
    paddingVertical: 8,
    paddingHorizontal: 0,
    borderRadius: 8,
    backgroundColor: theme.colors.success,
  },
});

export default PriceButton;
