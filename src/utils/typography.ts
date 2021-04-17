import { isIOS, scaleFont } from './device';
import { TextStyle } from 'react-native';

// FONT FAMILY
const FONT_FAMILY_REGULAR = isIOS ? 'Avenir-Medium' : 'Roboto';
const FONT_FAMILY_BOLD = isIOS ? 'AvenirNext-Bold' : 'Roboto';
const FONT_FAMILY_HERO = 'YuseiMagic-Regular';

// FONT WEIGHT
const FONT_WEIGHT_REGULAR = '400';
const FONT_WEIGHT_BOLD = 'bold';

// FONT SIZE
const FONT_SIZE_30 = scaleFont(30);
const FONT_SIZE_19 = scaleFont(19);
const FONT_SIZE_18 = scaleFont(18);
const FONT_SIZE_17 = scaleFont(17);
const FONT_SIZE_16 = scaleFont(16);
const FONT_SIZE_14 = scaleFont(14);
const FONT_SIZE_12 = scaleFont(12);

// LINE HEIGHT
const LINE_HEIGHT_24 = scaleFont(24);
const LINE_HEIGHT_20 = scaleFont(20);
const LINE_HEIGHT_16 = scaleFont(16);

// FONT STYLE
export const FONT_REGULAR = {
  fontFamily: FONT_FAMILY_REGULAR,
  fontWeight: FONT_WEIGHT_REGULAR,
};

export const FONT_BOLD = {
  fontFamily: FONT_FAMILY_BOLD,
  fontWeight: FONT_WEIGHT_BOLD,
};

type Typography = 'hero' | 'header' | 'h1' | 'h2' | 'h3' | 'body' | 'p' | 'button' | 'drawerLabel';

const typography: Record<Typography, TextStyle> = {
  hero: {
    fontSize: FONT_SIZE_30,
    fontFamily: FONT_FAMILY_HERO,
    letterSpacing: 0.5,
    color: 'white',
  },
  header: {
    fontSize: FONT_SIZE_18,
    fontFamily: FONT_FAMILY_HERO,
    letterSpacing: 1,
  },
  h1: {
    fontFamily: FONT_FAMILY_BOLD,
    fontWeight: FONT_WEIGHT_BOLD,
    fontSize: FONT_SIZE_19,
  },
  h2: {
    fontFamily: FONT_FAMILY_HERO,
    fontWeight: FONT_WEIGHT_REGULAR,
    fontSize: FONT_SIZE_18,
  },
  h3: {
    fontFamily: FONT_FAMILY_REGULAR,
    fontWeight: FONT_WEIGHT_REGULAR,
    fontSize: FONT_SIZE_16,
  },
  body: {
    fontSize: FONT_SIZE_16,
    lineHeight: LINE_HEIGHT_24,
    fontFamily: FONT_FAMILY_REGULAR,
  },
  p: {
    fontSize: FONT_SIZE_14,
    fontFamily: FONT_FAMILY_REGULAR,
  },
  button: {
    fontFamily: FONT_FAMILY_REGULAR,
    fontWeight: '800',
    fontSize: 16,
    textAlign: 'center',
  },
  drawerLabel: {
    color: 'black',
    fontFamily: FONT_FAMILY_HERO,
    fontSize: FONT_SIZE_16,
    letterSpacing: 0.5,
  },
};

export default typography;
