import React, { FC } from 'react';
import { Image, StyleSheet, View, ViewStyle } from 'react-native';
import AppText from './AppText';
import assets from '../assets';

interface Props {
  text: string;
  iconName?: 'oldMan1' | 'prettyLady';
  style?: ViewStyle;
}
const NoContentInfo: FC<Props> = ({ text, iconName = 'oldMan1', style }) => (
  <View style={[styles.container, style]}>
    <View style={styles.row}>
      <Image source={assets.icons[iconName]} style={styles.img} resizeMode="contain" />
      <View>
        <AppText size="h1" centered>
          Press plus to
        </AppText>
        <AppText size="h2" centered>
          create your first {text}
        </AppText>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  img: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NoContentInfo;
