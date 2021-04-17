import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import IconButton from './IconButton';
import { DrawerStackParamList } from '../navigation/types';
import { getPlatformDimension, isIOS, moderateScale } from '../utils/device';
import Title from './Title';

const TopBar = () => {
  const navigation = useNavigation<DrawerNavigationProp<DrawerStackParamList>>();
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <IconButton onPress={() => navigation.openDrawer()} iconName="menuCurve" />
      </View>
      <Title title="Decks" />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    top: getPlatformDimension(20, 20, 5), // Dont like that
    left: moderateScale(16),
    position: 'absolute',
    zIndex: 9,
  },
  container: {
    zIndex: 9,
    paddingBottom: isIOS ? 25 : 20,
  },
});

export default TopBar;
