import React, { FC, ReactNode, ReactNodeArray } from 'react';
import { StyleProp, Text, TextStyle, TextProps } from 'react-native';
import { typography } from '../utils';

interface Props extends TextProps {
  children: string | ReactNode | ReactNodeArray;
  centered?: boolean;
  underlined?: boolean;
  size: TTextSize;
  textStyle?: StyleProp<TextStyle> | StyleProp<TextStyle>[];
}

type TTextAlign = 'left' | 'center' | 'auto' | 'right' | 'justify' | undefined;
type TTextSize = 'h1' | 'h2' | 'h3' | 'hero' | 'header' | 'body' | 'p';

export enum TextSize {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  HERO = 'hero',
  HEADER = 'header',
  BODY = 'body',
  P = 'p',
}

const getStyles = (size: TextSize | TTextSize) => {
  switch (size) {
    case TextSize.H1:
      return typography.h1;
    case TextSize.H2:
      return typography.h2;
    case TextSize.H3:
      return typography.h3;
    case TextSize.HERO:
      return typography.hero;
    case TextSize.HEADER:
      return typography.header;
    case TextSize.BODY:
      return typography.body;
    case TextSize.P:
      return typography.p;
    default:
      return {};
  }
};

const AppText: FC<Props> = ({
  children,
  underlined = false,
  centered = false,
  size,
  textStyle = {},
  ...rest
}) => {
  const customStyle = getStyles(size);
  const style = [
    { textAlign: centered ? 'center' : ('left' as TTextAlign) },
    { textDecorationLine: underlined ? 'underline' : 'none' },
    customStyle,
    textStyle,
  ];

  return (
    <Text style={style} {...rest}>
      {children}
    </Text>
  );
};

export default AppText;
