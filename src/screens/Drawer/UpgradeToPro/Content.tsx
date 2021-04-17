import React, { createRef, FC, useCallback, useRef, useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { GeneralAlert, PriceButton } from '../../../common';
import AppText from '../../../common/AppText';
import assets from '../../../assets';
import { theme } from '../../../utils';
import Item from './Item';
import { usePayments } from '../../../modules/usePayments';
import { isEmpty } from 'ramda';
import { TERMS } from '../../../config';
import { data } from './data';
import { getPlatformDimension } from '../../../utils/device';
import { GeneralAlertRef, NotificationMessages } from '../../../common/GeneralAlert';

interface Props {
  onNavigateToShop: () => void;
}

const Content: FC<Props> = ({ onNavigateToShop }) => {

  const alertRef = useRef<GeneralAlertRef>(null);

  const onSuccess = () => {
    alertRef?.current?.startAnimation();
  }

  const { productsObject, isLoadingProducts, onBuyPack } = usePayments(onSuccess);
  const isProductObj = !isEmpty(productsObject) && !isLoadingProducts;
  const monthlySubsText = isProductObj
    ? `${productsObject.monthly_subscription.localizedPrice} / month`
    : 'N/A';
  const yearlySubsText = isProductObj ? `${productsObject.yearly_subscription.localizedPrice} / year` : 'N/A';


  return (
    <>
      <GeneralAlert
        text={NotificationMessages.THANK_YOU}
        ref={alertRef}
      />
      <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Image source={assets.icons.flashMaster} style={styles.image} />
            <View style={{ marginTop: 30 }}>
              <AppText size="h1">BECOME A</AppText>
              <AppText size="h1">FLASHMASTER</AppText>
            </View>
          </View>
          <View style={styles.textContent}>
            {data.map((item, index) => (
              <Item key={index} icon={item.icon} label={item.label} text={item.text} />
            ))}
          </View>
          <View style={styles.buttonContainer}>
            <PriceButton
              primaryText={monthlySubsText}
              onPress={() => isProductObj && onBuyPack(productsObject.monthly_subscription)}
              style={{ backgroundColor: theme.colors.icon }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <PriceButton
              primaryText={yearlySubsText}
              onPress={() => isProductObj && onBuyPack(productsObject.yearly_subscription)}
            />
            <View style={styles.arrowContainer}>
              <Image source={assets.icons.arrow} style={styles.arrowImg} resizeMode="contain" />
              <AppText size="h3">50% off</AppText>
            </View>
          </View>
          <PriceButton
            isSecondaryText={false}
            primaryText="Shop"
            onPress={onNavigateToShop}
            style={styles.shopButton}
          />
        </View>
        <View style={styles.info}>
          <AppText size="p">{TERMS}</AppText>
          <View style={styles.innerInfo}>
            <AppText size="p" underlined onPress={() => console.log('ADD LINK')}>
              Terms of Service
            </AppText>
            <AppText size="p" underlined onPress={() => console.log('ADD LInk')}>
              Privacy Policy
            </AppText>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  scrollView: {
    backgroundColor: 'white',
    paddingTop: 80,
  },
  content: {
    backgroundColor: '#fff',
    marginTop: getPlatformDimension(-39, -60),
  },
  image: {
    aspectRatio: 0.8,
    resizeMode: 'contain',
    width: 120,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  textContent: {
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonContainer: {
    marginTop: 15,
    width: 150,
    alignSelf: 'center',
  },
  arrowContainer: {
    position: 'absolute',
    flexDirection: 'row',
    right: -70,
  },
  arrowImg: {
    width: 40,
    height: 30,
  },
  info: {
    marginVertical: 50,
  },
  innerInfo: {
    flex: 1,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  shopButton: {
    backgroundColor: theme.colors.icon,
    width: 150,
    alignSelf: 'center',
    marginTop: 15,
    paddingVertical: 15,
  },
});

export default Content;
