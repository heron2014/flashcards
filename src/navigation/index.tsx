import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './DrawerNavigator';
import { useNavigationStateChange } from './useNavigationStateChange';

const Navigation = () => {
  const { navigationRef, handleReady, handleStateChange } = useNavigationStateChange();
  return (
    <NavigationContainer ref={navigationRef} onReady={handleReady} onStateChange={handleStateChange}>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
