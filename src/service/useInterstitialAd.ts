import { useEffect } from 'react';
import { captureException } from '@sentry/react-native';
import { InterstitialAd, AdEventType } from '@react-native-firebase/admob';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Logger } from './Logger';

const showInterstitialAd = (adId: string) => {
  // Create a new instance
  const interstitialAd = InterstitialAd.createForAdRequest(adId);

  // Add event handlers
  interstitialAd.onAdEvent((type, error) => {
    if (error) {
      Logger.sendLocalError(error, 'showInterstitialAd');
      captureException(error);
      return undefined;
    }
    if (type === AdEventType.LOADED) {
      interstitialAd.show();
    }
  });

  // Load a new advert
  interstitialAd.load();
};

const useInterstitialAd = (adId: string) => {
  const { shop } = useSelector((state: RootState) => state);

  useEffect(() => {
    if (shop.removeAds || shop.yearlySubscription || shop.monthlySubscription) {
      return;
    }
    if (!adId) {
      return undefined;
    }

    showInterstitialAd(adId);
  }, [adId, shop.removeAds, shop.monthlySubscription, shop.yearlySubscription]);
};

export { useInterstitialAd };
