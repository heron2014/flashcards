import React, { useRef } from 'react';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Analytics from 'appcenter-analytics';
import { RootStackParamList, Screens } from './types';
import QuestionModal from '../screens/QuestionModal';
import AnswerModal from '../screens/AnswerModal';
import Playground from '../screens/Playground';
import AlertModal from '../common/AlertModal';
import DrawerNavigator from './DrawerNavigator';
import AddDeck from '../screens/Home/AddDeck';
import { opacityTransition, verticalTopToBottomTransition } from './utils';
import { analytics } from '../utils';

const Stack = createStackNavigator<RootStackParamList>();

const Navigation = () => {
  const navigationRef = useRef<NavigationContainerRef>(null);
  const routeNameRef = useRef(null);
  const handleReady = () => {
    if (navigationRef && navigationRef.current) {
      // @ts-ignore
      routeNameRef.current = navigationRef.current.getCurrentRoute().name;
    }
  };
  const handleStateChange = () => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName =
      // @ts-ignore
      navigationRef && navigationRef.current && navigationRef.current.getCurrentRoute().name;
    if (previousRouteName !== currentRouteName) {
      Analytics.trackEvent(analytics.screenVisibility, {
        currentRouteName,
      }).catch(null);
    }
  };
  return (
    <NavigationContainer ref={navigationRef} onReady={handleReady} onStateChange={handleStateChange}>
      <Stack.Navigator mode="modal" initialRouteName={Screens.HOME} screenOptions={{ headerShown: false }}>
        <Stack.Screen name={Screens.DRAWER} component={DrawerNavigator} options={{ headerShown: false }} />
        <Stack.Screen name={Screens.QUESTION_MODAL} component={QuestionModal} />
        <Stack.Screen name={Screens.PLAYGROUND} component={Playground} />
        <Stack.Screen name={Screens.ANSWER_MODAL} component={AnswerModal} />
        <Stack.Screen name={Screens.ADD_DECK} component={AddDeck} options={verticalTopToBottomTransition} />
        <Stack.Screen name={Screens.ALERT} component={AlertModal} options={opacityTransition} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
