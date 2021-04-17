import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { captureException } from '@sentry/react-native';
import LottieView from 'lottie-react-native';
import { Container, PrimaryButton, AppText } from '../../common';
import { sendEmail } from '../../lib';
import animations from '../../assets/animations';
import { getPlatformDimension } from '../../utils/device';
import * as Analytics from 'appcenter-analytics';
import { analytics } from '../../utils';
import { Logger } from '../../service/Logger';

const Contact: FC = () => {
  const handleContact = () => {
    Analytics.trackEvent(analytics.contactUs).catch(null);
    sendEmail('hello@brainsandbrawn.studio', 'Hello from FlashCard App!')
      .then(() => {
        Logger.sendMessage('Email is sent');
      })
      .catch((error) => {
        Logger.sendLocalError(error, 'sendEmail');
        captureException(error);
      });
  };

  return (
    <Container style={styles.container}>
      <View style={styles.animationContainer}>
        <LottieView autoPlay loop speed={1.5} source={animations.contact} />
      </View>
      <View style={styles.content}>
        <AppText centered size="h2">
          Any issues?
        </AppText>
        <AppText centered size="h2">
          Please contact us
        </AppText>
        <View style={styles.buttonContainer}>
          <PrimaryButton buttonText="Contact us" onPress={handleContact} />
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  buttonContainer: {
    marginTop: 20,
    width: 120,
    alignSelf: 'center',
  },
  animationContainer: {
    flex: 1.2,
    alignItems: 'center',
    marginTop: getPlatformDimension(60, 60, 80, 100),
  },
  content: {
    flex: 1,
    marginVertical: 20,
  },
});

export default Contact;
