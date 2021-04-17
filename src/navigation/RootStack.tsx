import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList, Screens } from './types';
import HomeStack from './HomeStack';
import QuestionModal from '../screens/QuestionModal';
import Playground from '../screens/Playground';
import AnswerModal from '../screens/AnswerModal';
import AddDeck from '../screens/Home/AddDeck';
import { opacityTransition, verticalTopToBottomTransition } from './utils';
import AlertModal from '../common/AlertModal';
import ShopStack from './ShopStack';

const Stack = createStackNavigator<RootStackParamList>();

export const RootStack = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name={Screens.HOME} component={HomeStack} />
    <Stack.Screen name={Screens.QUESTION_MODAL} component={QuestionModal} />
    <Stack.Screen name={Screens.PLAYGROUND} component={Playground} />
    <Stack.Screen name={Screens.ANSWER_MODAL} component={AnswerModal} />
    <Stack.Screen name={Screens.ADD_DECK} component={AddDeck} options={verticalTopToBottomTransition} />
    <Stack.Screen name={Screens.ALERT} component={AlertModal} options={opacityTransition} />
    <Stack.Screen name={Screens.UPGRADE_TO_PRO_MODAL} component={ShopStack} />
  </Stack.Navigator>
);
