import React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CloseButton, Container } from '../../common';
import Content from '../Drawer/UpgradeToPro/Content';
import { Screens, ShopStackNavigationProp } from '../../navigation/types';

const UpgradeToProModal = () => {
  const navigation = useNavigation<ShopStackNavigationProp>();
  const handleCloseModal = () => navigation.goBack();
  const handleNavigateToShop = () => navigation.push(Screens.SHOP_MODAL);
  return (
    <Container style={styles.container}>
      <CloseButton onPress={handleCloseModal} />
      <Content onNavigateToShop={handleNavigateToShop} />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
});

export default UpgradeToProModal;
