import React, { FC } from 'react';
import { GestureResponderEvent, ImageBackground, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import Share from 'react-native-share';
import { useDispatch, useSelector } from 'react-redux';
import * as Analytics from 'appcenter-analytics';
import { AppText, PrimaryButton } from '../../../common';
import { getPlatformDimension, WINDOW_WIDTH } from '../../../utils/device';
import assets from '../../../assets';
import animations from '../../../assets/animations';
import { analytics } from '../../../utils';
import { shareOptions } from '../../../config';
import { sentInviteToFriends } from '../../../redux/user/actions';
import { addFreeDeck } from '../../../redux/decks/actions';
import { RootState } from '../../../redux/store';

interface Props {
  handleGoToShop: (e: GestureResponderEvent) => void;
}

const Content: FC<Props> = ({ handleGoToShop }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state);
  const handlePressInvite = () => {
    Analytics.trackEvent(analytics.getFreebie).catch(() => null);
    return Share.open(shareOptions)
      .then(() => {
        dispatch(sentInviteToFriends());
        dispatch(addFreeDeck(1));
      })
      .catch(() => {
        // FIXME add logger
        return null;
      });
  };
  return (
    <>
      <ImageBackground
        source={assets.icons.bubble}
        resizeMethod="scale"
        resizeMode="cover"
        style={styles.bubbleStyle}
        imageStyle={styles.bubbleImg}>
        <View style={styles.content}>
          {!user.hasSentInvite ? (
            <>
              <AppText size="h1" centered>
                Wanna get a free deck?
              </AppText>
              <View style={styles.spacer} />
              <AppText size="h2" centered>
                Simply send invite to your
              </AppText>
              <AppText size="h2" centered>
                friends, that's it :)
              </AppText>
              <PrimaryButton
                buttonText="Invite"
                onPress={handlePressInvite}
                buttonStyle={styles.buttonContainer}
              />
            </>
          ) : (
            <View style={{ margin: 40 }}>
              <AppText size="h2" centered>
                Looks like you've already invited your friends :) We are super grateful for that! Get more
                decks in our shop!
              </AppText>
              <PrimaryButton
                onPress={handleGoToShop}
                buttonText="Get more decks"
                buttonStyle={styles.buttonContainer}
              />
            </View>
          )}
        </View>
      </ImageBackground>
      <View style={styles.animationContainer}>
        <LottieView autoPlay loop speed={1.5} source={animations.lady} style={styles.lottie} />
      </View>
    </>
  );
};
const halfWindow = WINDOW_WIDTH / 2;
const styles = StyleSheet.create({
  content: {
    top: getPlatformDimension(halfWindow, halfWindow, halfWindow, halfWindow),
  },
  spacer: {
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 60,
    width: 140,
    alignSelf: 'center',
  },
  animationContainer: {
    position: 'absolute',
    bottom: 0,
    left: 10,
  },
  lottie: {
    width: 120,
  },
  bubbleStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    width: WINDOW_WIDTH,
  },
  bubbleImg: {
    top: getPlatformDimension(halfWindow - 70, halfWindow - 70, halfWindow - 70, 60),
    height: '65%',
    resizeMode: 'contain',
  },
});

export default Content;
