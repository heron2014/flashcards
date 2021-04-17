import React, { FC } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Container, PrimaryButton, AppText } from '../../common';
import rateApp from '../../modules/rateApp';
import assets from '../../assets';
import { getPlatformDimension } from '../../utils/device';
import { triggerRateApp } from '../../redux/user/actions';
import { useDispatch } from 'react-redux';

const RateTheApp: FC = () => {
  const dispatch = useDispatch();
  return (
    <Container style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={assets.icons.review} resizeMode="contain" style={styles.image} />
      </View>
      <View style={{ flex: 1 }}>
        <AppText centered size="h2">
          We'd love to hear from you.
        </AppText>
        <AppText centered size="h2">
          Your review means A LOT to us.
        </AppText>
        <View style={styles.buttonContainer}>
          <PrimaryButton
            buttonText="Rate & Review"
            onPress={() => {
              dispatch(triggerRateApp());
              return rateApp(false);
            }}
          />
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
  imageContainer: {
    flex: 1.5,
    marginLeft: 10,
    marginTop: getPlatformDimension(60, 60, 80, 100),
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  image: {
    aspectRatio: 1.5,
    resizeMode: 'contain',
    height: 300,
  },
  buttonContainer: {
    marginTop: 20,
    width: 150,
    alignSelf: 'center',
  },
});

export default RateTheApp;
