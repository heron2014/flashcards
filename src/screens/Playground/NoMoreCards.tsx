import React, { FC } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { useSelector } from 'react-redux';
import animations from '../../assets/animations';
import { AppText } from '../../common';
import { selectBadAnswers, selectGoodAnswers } from '../../redux/seclectors';
import assets from '../../assets';
import { getPlatformDimension, WINDOW_WIDTH } from '../../utils/device';
import { getUserScore } from '../../lib';

interface Props {
  deckId: string;
}

const NoMoreCards: FC<Props> = ({ deckId }) => {
  const badAnswers = useSelector(selectBadAnswers(deckId));
  const goodAnswers = useSelector(selectGoodAnswers(deckId));
  const scoreInfo = getUserScore(goodAnswers, badAnswers);
  // @ts-ignore
  const icon = animations[`${scoreInfo.icon}Lady`];

  return (
    <View style={styles.container}>
      <ImageBackground
        source={assets.icons.bubble}
        resizeMethod="scale"
        resizeMode="cover"
        style={styles.bubbleStyle}
        imageStyle={styles.bubbleImg}>
        <View style={styles.content}>
          <AppText size="h2" centered>
            Your score today is:
          </AppText>
          <View style={styles.spacer} />
          <AppText size="header" centered textStyle={styles.scoreText}>
            {scoreInfo.score}
          </AppText>
          <View style={styles.spacer} />
          <AppText size="h2" centered>
            {scoreInfo.secondary}
          </AppText>
          <AppText size="h2" centered>
            {scoreInfo.primary}
          </AppText>
        </View>
      </ImageBackground>
      <View style={styles.animationContainer}>
        <LottieView autoPlay loop speed={1.5} source={icon} style={styles.icon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  animationContainer: {
    position: 'absolute',
    bottom: 0,
    left: 10,
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
    bottom: getPlatformDimension(20, 20, 0, 60),
    height: '80%',
    resizeMode: 'contain',
  },
  content: {
    top: getPlatformDimension(WINDOW_WIDTH / 2 - 70, 20, 0, 60),
  },
  spacer: {
    marginTop: 10,
  },
  icon: {
    width: 120,
    height: 120,
  },
  scoreText: {
    fontSize: 30,
  },
});

export default NoMoreCards;
