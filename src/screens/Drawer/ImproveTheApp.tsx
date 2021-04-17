import React, { FC, useState } from 'react';
import { View, StyleSheet, ScrollView, Keyboard, Image } from 'react-native';
import { Container, DismissKeyboard, Input, PrimaryButton, RadioButton, AppText } from '../../common';
import { SPACING } from '../../utils/device';
import { theme } from '../../utils';
import Api from '../../api';
import assets from '../../assets';

const radioButtonsInitial = [
  { title: 'App Store (featured)', selected: false },
  { title: 'App Store (search or browse)', selected: false },
  { title: 'Word of Mouth', selected: false },
  { title: 'Social Media', selected: false },
  { title: 'Other', selected: false },
];

const initialState = {
  improve: '',
  like: '',
  otherApps: '',
  heardAbout: radioButtonsInitial,
};

const ImproveTheApp: FC = () => {
  const [{ improve, like, otherApps, heardAbout }, setState] = useState(initialState);

  const toggleCheckbox = (item: { title: string; selected: boolean }) => {
    const selected = radioButtonsInitial.map((i) => {
      if (item.title === i.title) {
        return { ...i, selected: !i.selected };
      }
      return i;
    });
    setState((prevState) => ({ ...prevState, heardAbout: selected }));
  };

  const dismissKeyboard = () => Keyboard.dismiss();

  const submit = async () => {
    const res = await Api.contact({ improve, like, otherApps, heard: heardAbout[0].title });
    if (res.data) {
      // TODO: add notifications
      setState(initialState);
    }
  };

  const onChange = (value: string, name: string) =>
    setState((prevState) => ({ ...prevState, [name]: value }));

  const isDisabled = heardAbout.every((i) => !i.selected);

  return (
    <Container style={{ backgroundColor: 'white' }}>
      <DismissKeyboard onPress={dismissKeyboard}>
        <>
          <View style={styles.topContainer}>
            <Image source={assets.icons.sideMan} style={styles.img} resizeMode="contain" />
            <Image source={assets.icons.oldMan1} style={styles.imgSmall} resizeMode="contain" />
            <Image source={assets.icons.prettyLady} style={styles.img} resizeMode="contain" />
            <Image source={assets.icons.boy} style={styles.imgSmall} resizeMode="contain" />
          </View>
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            indicatorStyle="white"
            scrollEventThrottle={16}>
            <AppText size="h2">How can we improve?</AppText>
            <Input value={improve} onChangeText={(text) => onChange(text, 'improve')} multiline />
            <AppText size="h2">What do you already like?</AppText>
            <Input value={like} onChangeText={(text) => onChange(text, 'like')} multiline />
            <AppText size="h2">What other apps/resources do you use, and why?</AppText>
            <Input value={otherApps} onChangeText={(text) => onChange(text, 'otherApps')} multiline />
            <AppText size="h2">How did you find out about our app?</AppText>
            {heardAbout.map((item, index) => (
              <RadioButton
                key={item.title}
                title={item.title}
                selected={heardAbout[index].selected}
                onPress={() => toggleCheckbox(heardAbout[index])}
              />
            ))}
            <View style={styles.buttonContainer}>
              <PrimaryButton buttonText="Send" onPress={submit} disabled={isDisabled} />
            </View>
          </ScrollView>
        </>
      </DismissKeyboard>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: SPACING,
  },
  topContainer: {
    marginTop: 0,
    left: 0,
    flexDirection: 'row-reverse',
    borderBottomWidth: 1,
    alignItems: 'baseline',
    borderColor: theme.colors.lightBorder,
  },
  contentContainer: {
    backgroundColor: 'white',
    paddingBottom: 150,
    paddingTop: 10,
  },
  buttonContainer: {
    marginTop: 20,
    width: 120,
    alignSelf: 'center',
  },
  img: {
    width: 70,
    height: 70,
  },
  imgSmall: {
    width: 70,
    height: 50,
  },
});

export default ImproveTheApp;
