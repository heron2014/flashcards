import React, { FC, useRef, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { isEmpty } from 'ramda';
import { AppText, GeneralAlert, PriceButton } from '../../../common';
import assets from '../../../assets';
import { theme } from '../../../utils';
import { usePayments } from '../../../modules/usePayments';
import { Product } from 'react-native-iap';
import { RootState } from '../../../redux/store';
import { GeneralAlertRef, NotificationMessages } from '../../../common/GeneralAlert';
import { data } from './data';

interface Props {
  onNavigateToUpgrade: () => void;
  onNavigateToFreebie: () => void;
}

const Content: FC<Props> = ({ onNavigateToUpgrade, onNavigateToFreebie }) => {
  const alertRef = useRef<GeneralAlertRef>(null);

  const onSuccess = () => {
    alertRef?.current?.startAnimation();
  };

  const { productsObject, isLoadingProducts, onBuyPack, restorePurchase } = usePayments(onSuccess);
  const { user } = useSelector((state: RootState) => state);

  const handleBuyProduct = (itemId: string, productId: Product) => {
    if (itemId === 'get_free') {
      return onNavigateToFreebie();
    }
    return onBuyPack(productId);
  };

  return (
    <>
      <GeneralAlert text={NotificationMessages.THANK_YOU} ref={alertRef} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Image source={assets.icons.happyFace} style={styles.image} />
          <View style={{ marginTop: 0, marginLeft: 10 }}>
            <AppText size="h1">WELCOME</AppText>
            <AppText size="h1">TO OUR SHOP</AppText>
          </View>
        </View>
        <AppText size="h2" centered>
          Support us
        </AppText>
        <AppText size="h2" centered>
          & get full access to our features
        </AppText>
        <View style={styles.textContent}>
          {data.map((item, index) => {
            const getLocalizedPriceOrItemPrice =
              (!isLoadingProducts &&
                !isEmpty(productsObject) &&
                productsObject[item.id] &&
                productsObject[item.id].localizedPrice) ||
              item.price;
            if (item.id === 'get_free' && user.hasSentInvite) {
              return null;
            }
            return (
              <TouchableOpacity
                key={index}
                disabled={isLoadingProducts}
                onPress={() => handleBuyProduct(item.id, productsObject[item.id])}>
                <View style={styles.itemButton}>
                  <View style={{ width: '70%' }}>
                    <AppText size="h2">{item.label}</AppText>
                  </View>
                  <View style={{ marginLeft: 20 }}>
                    <AppText size="h2">{getLocalizedPriceOrItemPrice}</AppText>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.buttonContainer}>
          <PriceButton
            primaryText="UPGRADE TO PRO"
            onPress={onNavigateToUpgrade}
            style={{ paddingHorizontal: 16 }}
          />
          <View style={styles.arrowContainer}>
            <Image source={assets.icons.arrow} style={styles.arrowImg} resizeMode="contain" />
            <AppText size="h3">50% off</AppText>
          </View>
        </View>
      </View>
      <View style={styles.info}>
        <AppText size="p" underlined centered onPress={restorePurchase}>
          Restore Purchase
        </AppText>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  content: {
    backgroundColor: '#fff',
  },
  image: {
    aspectRatio: 0.8,
    resizeMode: 'contain',
    width: 80,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  textContent: {
    marginTop: 30,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonContainer: {
    marginTop: 15,
    width: 200,
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
    marginTop: 40,
  },
  itemButton: {
    flexDirection: 'row',
    margin: 5,
    backgroundColor: theme.colors.icon,
    padding: 16,
    borderRadius: 8,
    width: 240,
    ...theme.buttonShadow,
  },
});

export default Content;
