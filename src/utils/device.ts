import { Dimensions, PixelRatio, Platform, PlatformIOSStatic, StatusBar, StyleProp } from 'react-native';

export const width = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;
export const WINDOW_WIDTH = Dimensions.get('window').width;
const [shortDimension, longDimension] =
  width < WINDOW_HEIGHT ? [width, WINDOW_HEIGHT] : [WINDOW_HEIGHT, width];

//Default guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

export const scaleSize = (size: number) => (width / guidelineBaseWidth) * size;
export const scaleFont = (size: number) => size * PixelRatio.getFontScale();

export const scale = (size: number) => (shortDimension / guidelineBaseWidth) * size;
export const verticalScale = (size: number) => (longDimension / guidelineBaseHeight) * size;
export const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;
export const moderateVerticalScale = (size: number, factor = 0.5) =>
  size + (verticalScale(size) - size) * factor;

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const SPACING = 16;

export const HIT_SLOP = {
  top: isIOS ? 10 : 20,
  left: 20,
  bottom: 20,
  right: 20,
  backgroundColor: 'red',
};

export function isIphoneWithNotch() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 780 ||
      dimen.width === 780 ||
      dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 844 ||
      dimen.width === 844 ||
      dimen.height === 896 ||
      dimen.width === 896 ||
      dimen.height === 926 ||
      dimen.width === 926)
  );
}

export function isTablet() {
  const dimen = Dimensions.get('window');
  return (Platform.OS === 'ios' && Platform.isPad) || dimen.width > 926 || dimen.height > 926;
}

export function getPlatformDimension(ios: number, android: number, iPhoneX?: number, tablet?: number) {
  if (tablet && isTablet()) {
    return tablet;
  }
  if (isIOS) {
    if (isIphoneWithNotch()) {
      return iPhoneX || ios + 15;
    }
    return ios;
  }
  return android;
}

// Ref https://www.paintcodeapp.com/news/ultimate-guide-to-iphone-resolutions
export const smallDeviceHeight = 568;
export const largeDeviceHeight = 736;

export const isSmallDevice = () => WINDOW_HEIGHT <= smallDeviceHeight;
export const isLargeDevice = () => WINDOW_HEIGHT >= largeDeviceHeight;

function getStatusBarHeight(safe = false, androidBarHeight: number = StatusBar.currentHeight || 0) {
  return Platform.select({
    ios: isIphoneWithNotch() ? 44 : 20,
    android: androidBarHeight,
  });
}

function getBottomSpace(): number {
  return isIphoneWithNotch() ? 34 : 0;
}

// https://stackoverflow.com/a/25550871/2829540
export const IOS_TABBAR_HEIGHT = isIphoneWithNotch() ? 120 : 49;
export const ANDROID_TABBAR_HEIGHT = 56;
