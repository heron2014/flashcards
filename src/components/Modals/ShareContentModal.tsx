import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Share from 'react-native-share';
import { captureException } from '@sentry/react-native';
import * as Analytics from 'appcenter-analytics';
import { selectDeckItem } from '../../redux/seclectors';
import Api from '../../api';
import { editSharedOnDeck } from '../../redux/decks/actions';
import { analytics, theme } from '../../utils';
import AppText from '../../common/AppText';
import Icon from '../../common/Icon';
import PrimaryButton from '../../common/PrimaryButton';
import { shareOptionsWithCode } from '../../config';
import { Logger } from '../../service/Logger';

const ShareContentModal = ({ deckId, handleGoBack }: { deckId: string; handleGoBack: () => void }) => {
  const deckDetail = useSelector(selectDeckItem(deckId));
  const dispatch = useDispatch();

  const handleSharePress = async () => {
    try {
      if (!deckDetail.sharedByYou) {
        const res = await Api.saveDeck(deckDetail);
        // TODO: user must be online to be able to share
        // TODO: network notifications
        if (res.data) {
          return Share.open(shareOptionsWithCode(deckDetail.shareId))
            .then(() => {
              dispatch(editSharedOnDeck(deckId));
              handleGoBack();
            })
            .catch(() => null);
        }
      }
      await Analytics.trackEvent(analytics.shareDeckByUser);
      return Share.open(shareOptionsWithCode(deckDetail.shareId))
        .then(() => {
          handleGoBack();
        })
        .catch(() => null);
    } catch (error) {
      Logger.sendLocalError(error, 'ShareContentModal');
      captureException(error);
    }
  };

  return (
    <View style={styles.wrapper}>
      <AppText size="h2">"Sharing is caring"</AppText>
      <View style={styles.iconContainer}>
        <Icon name="happyFace2" imgStyle={styles.icon} />
      </View>
      <View style={styles.shareButtonContainer}>
        <PrimaryButton buttonText="Share your deck" onPress={handleSharePress} />
      </View>
      <View style={styles.textContent}>
        <AppText size="body" centered>
          Click the button
        </AppText>
        <View style={styles.row}>
          <AppText size="body">or share this code:</AppText>
          <TextInput
            editable={false}
            keyboardType={undefined}
            value={deckDetail.shareId}
            style={styles.codeInput}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: 40,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  textContent: {
    marginTop: 20,
  },
  shareButtonContainer: {
    width: 180,
    alignSelf: 'center',
  },
  iconContainer: {
    alignSelf: 'center',
    marginVertical: 36,
  },
  icon: {
    width: 60,
    height: 60,
  },
  codeInput: {
    fontSize: 20,
    borderRadius: 4,
    marginLeft: 5,
    paddingHorizontal: 4,
    width: 72,
    backgroundColor: theme.colors.placeholder,
  },
});

export { ShareContentModal };
