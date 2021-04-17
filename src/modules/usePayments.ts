import { useEffect, useState } from 'react';
import {
  clearProductsIOS,
  finishTransaction,
  flushFailedPurchasesCachedAsPendingAndroid,
  getAvailablePurchases,
  getProducts,
  InAppPurchase,
  initConnection,
  Product,
  PurchaseError,
  purchaseErrorListener,
  purchaseUpdatedListener,
  requestPurchase,
} from 'react-native-iap';
import { Alert, EmitterSubscription } from 'react-native';
import { captureException } from '@sentry/react-native';
import { useDispatch } from 'react-redux';
import { isAndroid, isIOS } from '../utils/device';
import { dispatchShopActions, itemSkus, ProductsIds } from './InAppPurchaseConfig';
import { Logger } from '../service/Logger';

let purchaseUpdateSubscription: EmitterSubscription;
let purchaseErrorSubscription: EmitterSubscription;

type ProductsObject = { [key: string]: Product };

export const usePayments = (onPurchaseSuccessful: () => void) => {
  const dispatch = useDispatch();
  const [productsObject, setProductsObject] = useState<ProductsObject>({});
  const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(true);
  const [isProcessingPurchase, setIsProcessingPurchase] = useState<boolean>(false);

  const handleBuyPack = (item: Product): void => {
    requestPurchase(item.productId).catch(() => {
      return null;
    });
    setIsProcessingPurchase(true);
  };

  const restorePurchase = async (): Promise<void> => {
    try {
      const purchases = await getAvailablePurchases();
      if (!purchases.length) {
        Alert.alert('No Purchases', "We couldn't find any purchase to restore");
        return;
      }

      purchases.forEach((purchase) => {
        const shopActions = dispatchShopActions(purchase.productId, dispatch);
        if (shopActions) {
          Alert.alert('Restore Successful', 'You successfully restored your purchase');
          return onPurchaseSuccessful();
        } else {
          Alert.alert('No Purchases', "We couldn't find any purchase to restore");
          return null;
        }
      });
    } catch (err) {
      Logger.sendLocalError(err, 'Payment failed');
      captureException(err);
      Alert.alert(err.message);
    }
  };

  useEffect(() => {
    const getInAppsProducts = async (): Promise<void> => {
      try {
        if (isIOS) {
          await clearProductsIOS();
        }
        await initConnection();
        if (isAndroid) {
          await flushFailedPurchasesCachedAsPendingAndroid();
        }
      } catch (err) {
        Logger.sendLocalError(err, 'getInAppsProducts');
        captureException(err);
      }

      purchaseUpdateSubscription = purchaseUpdatedListener(async (purchase: InAppPurchase) => {
        const receipt = purchase.transactionReceipt;
        if (receipt) {
          try {
            await finishTransaction(purchase);
          } catch (ackErr) {
            Logger.sendLocalError(ackErr, 'purchaseUpdateSubscription');
            captureException(ackErr);
          }
          setIsProcessingPurchase(false);
          dispatchShopActions(purchase.productId, dispatch);
          return onPurchaseSuccessful();
        }
      });

      purchaseErrorSubscription = purchaseErrorListener((error: PurchaseError) => {
        setIsProcessingPurchase(false);
        if (error.code !== 'E_USER_CANCELLED') {
          const errorTitle = isIOS ? 'Shop.appStoreError' : 'Shop.googlePlayError';
          Alert.alert(errorTitle, error.message);
          Logger.sendLocalError(new Error('Purchase Error'));
          captureException(error);
        }
      });

      try {
        const products = await getProducts<ProductsIds>(itemSkus);
        const mappedProducts = products.reduce((acc, cur) => {
          return {
            ...acc,
            [cur.productId]: cur,
          };
        }, {});

        setProductsObject(mappedProducts);
        setIsLoadingProducts(false);
      } catch (e) {
        Logger.sendLocalError(e, 'getProducts - usePayments');
        captureException(e);
      }
    };

    getInAppsProducts().catch((e) => {
      Logger.sendLocalError(e, 'getInAppsProducts');
      captureException(e);
    });

    return (): void => {
      if (purchaseUpdateSubscription) {
        purchaseUpdateSubscription.remove();
      }

      if (purchaseErrorSubscription) {
        purchaseErrorSubscription.remove();
      }
    };
  }, [dispatch]);

  return {
    productsObject,
    isLoadingProducts,
    isProcessingPurchase,
    onBuyPack: handleBuyPack,
    restorePurchase,
  };
};
