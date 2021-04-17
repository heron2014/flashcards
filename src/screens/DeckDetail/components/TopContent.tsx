import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { getPlatformDimension, isSmallDevice, SPACING } from '../../../utils/device';
import { theme } from '../../../utils';
import { Icon, AppText } from '../../../common';

interface Props {
  total: number;
  badAnswersTotal: number;
  goodAnswersTotal: number;
}

const TopContent: FC<Props> = ({ total, badAnswersTotal, goodAnswersTotal }) => (
  <View style={styles.row}>
    <View style={styles.outerBox}>
      <Icon name="happyFace" bgColor={theme.colors.good} imgStyle={styles.iconImage} style={styles.icon} />
      <AppText size="h1" textStyle={{ color: theme.colors.border }}>
        {goodAnswersTotal}
      </AppText>
      <AppText size="body" textStyle={styles.bodyText}>
        {goodAnswersTotal === 1 ? 'correct answer' : 'correct answers'}
      </AppText>
    </View>
    <View style={{ alignItems: 'center' }}>
      <AppText size="hero" textStyle={styles.heroText}>
        {total}
      </AppText>
      <AppText size="body" textStyle={{ color: theme.colors.border }}>
        {total === 1 ? 'card' : 'cards'}
      </AppText>
    </View>
    <View style={styles.outerBox}>
      <Icon name="notSureFace" bgColor={theme.colors.bad} imgStyle={styles.iconImage} style={styles.icon} />
      <AppText size="h1" textStyle={{ color: theme.colors.border }}>
        {badAnswersTotal}
      </AppText>
      <AppText size="body" textStyle={styles.bodyText}>
        {`incorrect answer${badAnswersTotal === 1 ? '' : 's'}`}
      </AppText>
    </View>
  </View>
);

const styles = StyleSheet.create({
  row: {
    marginVertical: isSmallDevice() ? 15 : getPlatformDimension(25, 30, 40),
    marginHorizontal: SPACING,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  outerBox: {
    marginTop: 20,
    alignItems: 'center',
  },
  heroText: {
    fontSize: 32,
    color: theme.colors.border,
    paddingTop: -20,
  },
  bodyText: {
    marginTop: -5,
    color: theme.colors.border,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: isSmallDevice() ? 15 : getPlatformDimension(20, 20, 40),
  },
  iconImage: {
    width: 50,
    height: 50,
  },
  icon: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
});

export default TopContent;
