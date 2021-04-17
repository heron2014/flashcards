import { Linking, NativeModules } from 'react-native';
import { captureException } from '@sentry/react-native';
import * as Analytics from 'appcenter-analytics';
import { analytics } from '../utils';
import { isIOS } from '../utils/device';
import { Logger } from '../service/Logger';

const IOS_STORE_URL = 'itms-apps://itunes.apple.com/app/id1496618544?action=write-review';
const ANDROID_STORE_URL = 'market://details?id=com.brainsandbrawns.forkflick';

const { FlashCardsRateApp } = NativeModules;

const rateAndroidOnDemand = async () => {
  Analytics.trackEvent(analytics.reviewApp, { platform: 'Android' }).catch(null);
  try {
    // native in-app review
    await FlashCardsRateApp.requestReview();
  } catch (e) {
    // redirect user to the play store
    Linking.openURL(ANDROID_STORE_URL).catch((err) => {
      Logger.sendLocalError(err, 'Android - triggerRateAppModal');
      captureException(err);
    });
  }
};

const rateIOS = () => {
  Analytics.trackEvent(analytics.reviewApp, { platform: 'IOS' }).catch(null);
  if (FlashCardsRateApp.isAvailable) {
    return FlashCardsRateApp.requestReview();
  }
  return Linking.openURL(IOS_STORE_URL).catch((error) => {
    Logger.sendLocalError(error, 'iOS - triggerRateApp');
    captureException(error);
  });
};

// Note:
// onDemand means in-app rate the app is triggered programmatically - for example if someone creates the third deck
// if onDemand = false we trigger rate the app by clicking the button (Rate us in settings) and redirect the user to Google Play
const rateApp = (onDemand: boolean) => {
  if (isIOS) {
    return rateIOS();
  }
  if (onDemand) {
    return rateAndroidOnDemand();
  }
  return Linking.openURL(ANDROID_STORE_URL).catch((err) => {
    Logger.sendLocalError(err, 'Android - triggerRateAppModal');
    captureException(err);
  });
};

export default rateApp;
