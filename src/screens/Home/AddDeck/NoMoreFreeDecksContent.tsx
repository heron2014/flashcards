import React, { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import assets from '../../../assets';
import { PrimaryButton } from '../../../common';
import { getPlatformDimension, isIOS } from '../../../utils/device';
import { theme } from '../../../utils';

interface Props {
  onNavigate: () => void;
}

const NoMoreFreeDecksContent: FC<Props> = ({ onNavigate }) => (
  <View style={styles.container}>
    <Image source={assets.icons.shopIsOpen} resizeMode="contain" style={styles.image} />
    <View style={styles.buttonContainer}>
      <PrimaryButton
        disabled={false}
        buttonText="Get more decks"
        onPress={onNavigate}
        hasShadow={isIOS}
        buttonStyle={styles.buttonStyle}
        buttonTextStyle={{ color: theme.colors.border }}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: getPlatformDimension(30, 30, 40, 50),
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonContainer: {
    marginTop: 40,
    width: 140,
    alignSelf: 'center',
  },
  buttonStyle: {
    backgroundColor: theme.colors.icon,
  },
  image: {
    aspectRatio: 1.5,
    resizeMode: 'contain',
    height: 320,
  },
});

export { NoMoreFreeDecksContent };
