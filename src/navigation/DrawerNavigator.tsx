import React, { FC } from 'react';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { DrawerScreenNavigationProp, DrawerStackParamList, Screens } from './types';
import DrawerContent from '../screens/Drawer/DrawerContent';
import { IconButton } from '../common';
import GetFreebie from '../screens/Drawer/GetFreebie';
import RateTheApp from '../screens/Drawer/RateTheApp';
import ShareTheApp from '../screens/Drawer/ShareTheApp';
import RequestFeature from '../screens/Drawer/RequestFeature';
import Contact from '../screens/Drawer/Contact';
import { theme } from '../utils';
import { getPlatformDimension, moderateScale } from '../utils/device';
import UpgradeToPro from '../screens/Drawer/UpgradeToPro';
import ImproveTheApp from '../screens/Drawer/ImproveTheApp';
import Shop from '../screens/Drawer/Shop';
import { RootStack } from './RootStack';

const Drawer = createDrawerNavigator<DrawerStackParamList>();
const Stack = createStackNavigator<DrawerStackParamList>();

const setOptions = (navigation: DrawerScreenNavigationProp) => ({
  headerTransparent: true,
  headerTitle: '',
  gestureEnabled: false, // prevent dismiss the screen by swiping
  headerLeft: () => (
    <IconButton iconName="menuCurve" onPress={navigation.openDrawer} style={styles.menuIcon} />
  ),
});

const homeOptions = {
  headerTransparent: true,
  headerTitle: '',
};

export interface Props {
  style: Animated.AnimateStyle<ViewStyle>;
  navigation: DrawerScreenNavigationProp;
}

const DrawerScreensStack: FC<Props> = ({ navigation, style }) => {
  return (
    <Animated.View style={StyleSheet.flatten([styles.scene, style])}>
      <Stack.Navigator>
        <Stack.Screen name={Screens.HOME} component={RootStack} options={homeOptions} />
        <Stack.Screen name={Screens.IMPROVE_APP} component={ImproveTheApp} options={setOptions(navigation)} />
        <Stack.Screen name={Screens.GET_FREEBIE} component={GetFreebie} options={setOptions(navigation)} />
        <Stack.Screen name={Screens.RATE_APP} component={RateTheApp} options={setOptions(navigation)} />
        <Stack.Screen name={Screens.SHARE_APP} component={ShareTheApp} options={setOptions(navigation)} />
        <Stack.Screen name={Screens.UPGRADE} component={UpgradeToPro} options={setOptions(navigation)} />
        <Stack.Screen
          name={Screens.REQUEST_FEATURE}
          component={RequestFeature}
          options={setOptions(navigation)}
        />
        <Stack.Screen name={Screens.CONTACT} component={Contact} options={setOptions(navigation)} />
        <Stack.Screen name={Screens.SHOP} component={Shop} options={setOptions(navigation)} />
      </Stack.Navigator>
    </Animated.View>
  );
};

const DrawerNavigator = () => {
  let animatedStyle: Animated.AnimateStyle<ViewStyle> = {};
  const animateDrawerContent = (props: DrawerContentComponentProps) => {
    const scale = Animated.interpolate(props.progress, {
      inputRange: [0, 1],
      outputRange: [1, 0.85],
      extrapolate: Animated.Extrapolate.CLAMP,
    });
    animatedStyle = {
      transform: [
        {
          scale: scale,
        },
      ],
    };
    return <DrawerContent navigation={props.navigation} />;
  };

  return (
    <View style={styles.container}>
      <Drawer.Navigator
        initialRouteName={Screens.HOME}
        drawerType="slide"
        drawerStyle={styles.drawer}
        overlayColor="transparent"
        sceneContainerStyle={styles.drawer}
        drawerContent={animateDrawerContent}>
        <Drawer.Screen name={Screens.DRAWER}>
          {(props) => <DrawerScreensStack {...props} style={animatedStyle} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scene: {
    flex: 1,
    ...theme.backgroundShadow,
  },
  drawer: {
    backgroundColor: theme.colors.drawer,
  },
  menuIcon: {
    left: moderateScale(16),
    top: getPlatformDimension(20, 20, 5), // Dont like that
  },
});

export default DrawerNavigator;
