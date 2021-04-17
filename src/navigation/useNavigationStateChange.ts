import { useRef } from 'react';
import { NavigationContainerRef } from '@react-navigation/native';
import * as Analytics from 'appcenter-analytics';
import { analytics } from '../utils';

const useNavigationStateChange = () => {
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

  return { navigationRef, handleReady, handleStateChange };
};

export { useNavigationStateChange };
