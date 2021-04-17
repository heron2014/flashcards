import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { HomeStackParams, Screens } from './types';
import Home from '../screens/Home';
import DeckDetail from '../screens/DeckDetail';
import { smoothOpacityTransition } from './utils';

const HomeStack = createSharedElementStackNavigator<HomeStackParams>();

const HomeStackScreen = () => (
  <HomeStack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name={Screens.HOME} component={Home} options={() => smoothOpacityTransition} />
    <HomeStack.Screen
      name={Screens.DECK_DETAIL}
      component={DeckDetail}
      options={() => smoothOpacityTransition}
      sharedElements={(route) => {
        const { id } = route.params;
        return [{ id: `item.${id}` }, { id: 'general.bg' }];
      }}
    />
  </HomeStack.Navigator>
);

export default HomeStackScreen;
