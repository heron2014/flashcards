import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppText from './AppText';
import CloseButton from './CloseButton';
import IconButton from './IconButton';
import { IconButtonProps } from './IconButton';

interface HeaderProps {
  left: {
    icon?: string;
    onPress: () => void;
  };
  title: string;
  right?: {
    icon: IconButtonProps['iconName'];
    onPress: () => void;
  };
  dark: boolean;
}

const Header = ({ title, left, right }: HeaderProps) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ ...styles.container, marginTop: insets.top }}>
      <CloseButton onPress={left.onPress} />
      <AppText size="h1" centered>
        {title}
      </AppText>
      {right ? <IconButton onPress={right.onPress} iconName={right.icon} /> : <View style={{ width: 44 }} />}
    </View>
  );
};

Header.defaultProps = {
  dark: false,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default Header;
