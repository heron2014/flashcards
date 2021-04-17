import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { theme } from '../../utils';
import { BackButton, Container } from '../../common';
import Content from '../Drawer/GetFreebie/Content';
import { Screens, ShopStackNavigationProp } from '../../navigation/types';

const GetFreebieModal = () => {
  const navigation = useNavigation<ShopStackNavigationProp>();
  const handleGoBack = () => navigation.goBack();
  const handleNavigateToShop = () => navigation.navigate(Screens.UPGRADE_TO_PRO_MODAL);
  return (
    <Container style={styles.container}>
      <BackButton onPress={handleGoBack} />
      <Content handleGoToShop={handleNavigateToShop} />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.colors.drawerItem.freeDeck,
  },
});

export default GetFreebieModal;
