import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { AlertScreenNavigationProp, AlertScreenRouteProp } from '../navigation/types';
import { getPlatformDimension, WINDOW_HEIGHT, WINDOW_WIDTH } from '../utils/device';
import IconButton from './IconButton';
import { ShareContentModal } from '../components/Modals/ShareContentModal';
import { CodeContentModal } from '../components/Modals/CodeContentModal';

export interface Props {
  navigation: AlertScreenNavigationProp;
  route: AlertScreenRouteProp;
}

const AlertModal: FC<Props> = ({ navigation, route: { params } }) => {
  const handleGoBack = () => navigation.pop();
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.content,
          params.modalTemplate === 'codeModal'
            ? { height: WINDOW_HEIGHT / 3 + 20 }
            : { height: WINDOW_HEIGHT / getPlatformDimension(2, 2, 2.5) },
        ]}>
        <View style={styles.closeButton}>
          <IconButton onPress={handleGoBack} iconName="x" />
        </View>
        {params.modalTemplate === 'shareModal' ? (
          <ShareContentModal deckId={params.deckId} handleGoBack={handleGoBack} />
        ) : (
          <CodeContentModal navigation={navigation} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    left: -10,
    position: 'absolute',
    top: -10,
    zIndex: 9,
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 6,
    width: WINDOW_WIDTH - 30, // FIXME width tablets??
    height: WINDOW_HEIGHT / 3,
  },
});

export default AlertModal;
