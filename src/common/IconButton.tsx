import React, { FC, memo } from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  GestureResponderEvent,
  ImageStyle,
  ViewStyle,
  TouchableWithoutFeedback,
} from 'react-native';
import assets from '../assets';
import { HIT_SLOP } from '../utils/device';
import { theme } from '../utils';
import useAnimatedPress from '../hooks/useAnimatedPress';

export interface IconButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  iconName:
    | 'goBack'
    | 'add'
    | 'trash'
    | 'play'
    | 'edit'
    | 'plus'
    | 'close'
    | 'wrong'
    | 'good'
    | 'menu'
    | 'menuCurve'
    | 'plusCurve'
    | 'x'
    | 'confusedFace'
    | 'notSureFace'
    | 'happyFace'
    | 'shuffle'
    | 'sort'
    | 'share'
    | 'refresh'
    | 'codebar'
    | 'basket';
  imgStyle?: ImageStyle;
  style?: ViewStyle;
  hasShadow?: boolean;
}

const IconButton: FC<IconButtonProps> = memo(({ onPress, iconName, style, imgStyle, hasShadow = true }) => {
  const { scale, handlePressIn, handlePressOut } = useAnimatedPress();
  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      hitSlop={HIT_SLOP}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
      <Animated.View
        style={[
          styles.container,
          style,
          hasShadow ? theme.iconButtonShadow : {},
          { transform: [{ scale }] },
        ]}>
        <Image source={assets.icons[iconName]} resizeMode="contain" style={[styles.img, imgStyle]} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
});

const styles = StyleSheet.create({
  img: {
    width: 20,
    height: 20,
    zIndex: 9,
  },
  container: {
    backgroundColor: theme.colors.icon,
    width: 40,
    height: 40,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99,
  },
});

export default IconButton;
