import Config from 'react-native-config';
import { TestIds } from '@react-native-firebase/admob';

const isProduction = Config.ENV === 'production';
const AdUnitIds = {
  IOS_PRE_PLAYGROUND_PROMO: isProduction ? Config.IOS_PRE_PLAYGROUND_PROMO_AD_UNIT_ID : TestIds.INTERSTITIAL,
  ANDROID_PRE_PLAYGROUND_PROMO: isProduction
    ? Config.ANDROID_PRE_PLAYGROUND_PROMO_AD_UNIT_ID
    : TestIds.INTERSTITIAL,
};

export { AdUnitIds };
