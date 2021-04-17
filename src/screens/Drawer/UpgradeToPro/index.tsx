import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Container } from '../../../common';
import { Screens, UpgradeScreenNavigationProp } from '../../../navigation/types';
import Content from './Content';

interface Props {
  navigation: UpgradeScreenNavigationProp;
}

const UpgradeToPro: FC<Props> = ({ navigation }) => {
  const handleGoToShop = () => navigation.navigate(Screens.SHOP);
  return (
    <Container style={styles.container}>
      <Content onNavigateToShop={handleGoToShop} />
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

export default UpgradeToPro;
