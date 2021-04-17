import React, { FC } from 'react';
import { AppText, PrimaryButton } from '../../../common';
import { Image, StyleSheet, TextInput, View } from 'react-native';
import assets from '../../../assets';
import { isIOS } from '../../../utils/device';
import { theme } from '../../../utils';

interface Props {
  newTitle: string;
  setNewTitle: (text: string) => void;
  onSave: () => void;
}

const AddDeckContent: FC<Props> = ({ newTitle, setNewTitle, onSave }) => (
  <>
    <AppText size="hero" centered>
      Your new deck name
    </AppText>
    <TextInput
      style={styles.input}
      value={newTitle}
      onChangeText={setNewTitle}
      placeholder=""
      placeholderTextColor="white"
      selectionColor="white"
    />
    <Image source={assets.icons.strokeWhite2} resizeMode="contain" style={styles.stroke} />
    <View style={styles.buttonContainer}>
      <PrimaryButton
        disabled={!newTitle}
        buttonText="Save"
        onPress={onSave}
        hasShadow={isIOS}
        buttonStyle={styles.buttonStyle}
        buttonTextStyle={{ color: theme.colors.border }}
      />
    </View>
  </>
);

const styles = StyleSheet.create({
  input: {
    marginTop: 40,
    height: 40,
    fontSize: 18,
    borderRadius: 0,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: 'white',
  },
  buttonContainer: {
    marginTop: 20,
    width: 140,
    alignSelf: 'center',
  },
  buttonStyle: {
    backgroundColor: theme.colors.icon,
  },
  stroke: {
    width: '100%',
    height: 5,
    resizeMode: 'contain',
  },
});

export { AddDeckContent };
