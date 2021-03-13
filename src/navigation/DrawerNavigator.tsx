import React, { FC } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import HomeStack from './HomeStack';
import { DrawerStackParamList, Screens } from './types';
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

const Drawer = createDrawerNavigator<DrawerStackParamList>();
const Stack = createStackNavigator<DrawerStackParamList>();

type DrawerScreenNavigationProp = DrawerNavigationProp<DrawerStackParamList, Screens.DRAWER_SCREENS>;

const setOptions = (navigation: DrawerScreenNavigationProp) => ({
  headerTransparent: true,
  headerTitle: '',
  gestureEnabled: false, // prevent dismiss the screen by swiping
  headerLeft: () => (
    <IconButton iconName="menuCurve" onPress={() => navigation.openDrawer()} style={styles.menuIcon} />
  ),
});

export interface Props {
  style: Animated.AnimateStyle<ViewStyle>; // CHECK THIS?
  navigation: DrawerScreenNavigationProp;
}

const DrawerScreensStack: FC<Props> = ({ navigation, style }) => {
  return (
    <Animated.View style={StyleSheet.flatten([styles.scene, style])}>
      <Stack.Navigator>
        <Stack.Screen
          name={Screens.HOME}
          component={HomeStack}
          options={{ headerTransparent: true, headerTitle: '' }}
        />
        <Stack.Screen
          name={Screens.IMPROVE_THE_APP}
          component={ImproveTheApp}
          options={setOptions(navigation)}
        />
        <Stack.Screen name={Screens.GET_FREEBIE} component={GetFreebie} options={setOptions(navigation)} />
        <Stack.Screen name={Screens.RATE_THE_APP} component={RateTheApp} options={setOptions(navigation)} />
        <Stack.Screen name={Screens.SHARE_THE_APP} component={ShareTheApp} options={setOptions(navigation)} />
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
  return (
    <View style={styles.container}>
      <Drawer.Navigator
        drawerType="slide"
        drawerStyle={styles.drawer}
        overlayColor="transparent"
        drawerContentOptions={{
          activeBackgroundColor: 'transparent',
        }}
        // set the scene background to transparent
        sceneContainerStyle={{ backgroundColor: 'transparent' }}
        drawerContent={(props) => {
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
          return <DrawerContent {...props} />;
        }}>
        <Drawer.Screen name={Screens.DRAWER_SCREENS}>
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
    backgroundColor: 'transparent',
  },
  menuIcon: {
    left: moderateScale(16),
    top: getPlatformDimension(20, 20, 5), // Dont like that
  },
});

export default DrawerNavigator;
