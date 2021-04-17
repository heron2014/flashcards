import React, { FC } from 'react';
import { View } from 'react-native';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Screens } from '../../navigation/types';
import { StyleSheet } from 'react-native';
import { Icon } from '../../common';
import { theme, typography } from '../../utils';
import { isIOS } from '../../utils/device';
import useAppVersion from '../../modules/AppVersion';

export interface Props {
  navigation: DrawerNavigationHelpers; // TODO - investigate why DrawerScreenNavigationProp cause error
}

const DrawerContent: FC<Props> = ({ navigation }) => {
  const { appVersion } = useAppVersion();

  return (
    <DrawerContentScrollView contentContainerStyle={styles.scrollView} scrollEnabled={false}>
      <View style={styles.topContent}>
        <DrawerItem
          label="Home"
          labelStyle={styles.labelStyle}
          onPress={() => navigation.navigate(Screens.HOME)}
          icon={() => <Icon name="home" bgColor={theme.colors.drawerItem.home} />}
        />
        <DrawerItem
          labelStyle={styles.labelStyle}
          label="Help improve the app"
          icon={() => <Icon name="speedometer" bgColor={theme.colors.drawerItem.improve} />}
          onPress={() => navigation.navigate(Screens.IMPROVE_APP)}
        />
        <DrawerItem
          label="Request feature"
          labelStyle={styles.labelStyle}
          onPress={() => navigation.navigate(Screens.REQUEST_FEATURE)}
          icon={() => <Icon name="magicWanda" bgColor={theme.colors.drawerItem.feature} />}
        />
        <DrawerItem
          style={[styles.space, styles.top]}
          label="Upgrade to PRO"
          labelStyle={styles.labelStyle}
          icon={() => <Icon name="student" bgColor={theme.colors.drawerItem.upgrade} />}
          onPress={() => navigation.navigate(Screens.UPGRADE)}
        />
        <DrawerItem
          labelStyle={styles.labelStyle}
          style={[styles.base, styles.middle]}
          icon={() => <Icon name="sale" bgColor={theme.colors.drawerItem.shop} />}
          label="Shop"
          onPress={() => navigation.navigate(Screens.SHOP)}
        />
        <DrawerItem
          labelStyle={styles.labelStyle}
          icon={() => <Icon name="free" bgColor={theme.colors.drawerItem.freeDeck} />}
          style={[styles.base, styles.bottom]}
          label="Get free deck"
          onPress={() => navigation.navigate(Screens.GET_FREEBIE)}
        />
        <DrawerItem
          style={[styles.space]}
          labelStyle={styles.labelStyle}
          icon={() => <Icon name="heartCupid" bgColor={theme.colors.drawerItem.share} />}
          label="Share App"
          onPress={() => navigation.navigate(Screens.SHARE_APP)}
        />
        <DrawerItem
          label="Rate the App"
          labelStyle={styles.labelStyle}
          onPress={() => navigation.navigate(Screens.RATE_APP)}
          icon={() => <Icon name="star" bgColor={theme.colors.drawerItem.rate} />}
        />
        <DrawerItem
          label="Contact us"
          labelStyle={styles.labelStyle}
          onPress={() => navigation.navigate(Screens.CONTACT)}
          icon={() => <Icon name="chat" bgColor={theme.colors.drawerItem.contact} />}
        />
      </View>
      <View>
        <DrawerItem labelStyle={styles.bottomLabelStyle} label={appVersion} onPress={() => null} />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginLeft: -5,
    flex: 1,
  },
  topContent: {
    justifyContent: 'center',
    flex: 1,
  },
  labelStyle: {
    ...typography.drawerLabel,
    marginLeft: -22,
    marginTop: isIOS ? 0 : -10,
  },
  bottomLabelStyle: {
    ...typography.p,
    marginLeft: 10,
  },
  base: {
    marginVertical: 0,
  },
  space: {
    marginTop: 20,
    marginBottom: 0,
  },
  top: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  middle: {
    backgroundColor: 'white',
    borderBottomColor: 'gray',
    borderRadius: 0,
  },
  bottom: {
    backgroundColor: 'white',
    borderBottomColor: 'gray',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
});

export default DrawerContent;
