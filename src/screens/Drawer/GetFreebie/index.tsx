import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Container } from '../../../common';
import { theme } from '../../../utils';
import { GetFreebieScreenNavigationProp, Screens } from '../../../navigation/types';
import Content from './Content';

interface Props {
  navigation: GetFreebieScreenNavigationProp;
}

const GetFreebie: FC<Props> = ({ navigation }) => {
  const handleGoToUpgrade = () => navigation.navigate(Screens.UPGRADE);

  return (
    <Container style={styles.container}>
      <Content handleGoToShop={handleGoToUpgrade} />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: theme.colors.drawerItem.freeDeck,
  },
});

export default GetFreebie;
