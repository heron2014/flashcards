import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { theme } from '../../utils';
import animations from '../../assets/animations';
import AppText from '../AppText';
import { isIphoneWithNotch } from '../../utils/device';

export enum NotificationMessages {
  UPDATE = 'Successfully updated',
  THANK_YOU = 'Thank you so so much!',
  ERROR = 'Something went wrong. Please try again.',
}

interface Props {
  text: NotificationMessages;
  onAnimationFinish?: () => void;
}

export interface GeneralAlertRef {
  startAnimation: () => void;
}

const GeneralAlert = forwardRef<GeneralAlertRef, Props>(({ text, onAnimationFinish }, ref) => {
  const bounceVal = useRef(new Animated.Value(isIphoneWithNotch() ? -144 : -100)).current;
  const isThankYou = text === NotificationMessages.THANK_YOU;
  const isError = text === NotificationMessages.ERROR;

  const bounceConfig = {
    velocity: 3,
    tension: 2,
    friction: 8,
    useNativeDriver: true,
  };

  // The component instance will be extended
  // with whatever you return from the callback passed
  // as the second argument
  useImperativeHandle(ref, () => ({
    startAnimation() {
      runAnimation();
    },
  }));

  const runAnimation = () => {
    Animated.sequence([
      Animated.spring(bounceVal, {
        toValue: 0,
        ...bounceConfig,
      }),
      Animated.spring(bounceVal, {
        delay: 3000,
        toValue: isIphoneWithNotch() ? -144 : -100,
        ...bounceConfig,
      }),
    ]).start(onAnimationFinish);
  };

  const renderContent = (message: NotificationMessages) => {
    if (message === NotificationMessages.ERROR) {
      return (
        <>
          <View style={styles.lottie}>
            <LottieView source={animations.thumbsDown} autoPlay loop style={styles.errorIcon} />
          </View>
          <AppText size="p" centered textStyle={[styles.text]}>
            {message}
          </AppText>
        </>
      );
    }
    return (
      <>
        <View style={styles.lottie}>
          <LottieView
            source={isThankYou ? animations.success : animations.thumbsUp}
            autoPlay
            loop
            style={styles.icon}
          />
        </View>
        <AppText
          size="p"
          centered
          textStyle={[styles.text, { color: isThankYou ? '#FF7373' : theme.colors.border }]}>
          {text}
        </AppText>
      </>
    );
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateY: bounceVal }] },
        isError && { backgroundColor: theme.colors.warning },
      ]}>
      {renderContent(text)}
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    zIndex: 9999,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.success,
    height: isIphoneWithNotch() ? 114 : 80,
  },
  lottie: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  text: {
    paddingTop: 10,
    color: theme.colors.border,
    fontWeight: '600',
    paddingBottom: 2,
  },
  errorIcon: {
    height: 200,
  },
  icon: {
    width: 80,
    height: 60,
  },
});

export default GeneralAlert;
