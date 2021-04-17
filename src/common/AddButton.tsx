import React, { useState } from 'react';
import { StyleSheet, Animated } from 'react-native';
import IconButton from './IconButton';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222',
    width: 40,
    height: 40,
    borderRadius: 28,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    elevation: 1,
  },
});

interface Props {
  onOpenModal: () => void;
}

const AddButton = ({ onOpenModal }: Props) => {
  const [scaleValue] = useState(new Animated.Value(0));

  const handlePress = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      duration: 700,
    }).start(() => {
      scaleValue.setValue(0);
    });
    onOpenModal();
  };

  const scaleValueInterpolation = scaleValue.interpolate({
    inputRange: [0, 0.25, 1],
    outputRange: [1, 20, 60],
  });

  return (
    <>
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ scale: scaleValueInterpolation }],
            top: 0,
            right: 0,
          },
        ]}
      />
      <IconButton onPress={handlePress} iconName="plusCurve" />
    </>
  );
};

export default AddButton;
