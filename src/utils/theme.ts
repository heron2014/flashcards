import { Dimensions, Platform } from 'react-native';
const { width } = Dimensions.get('window');
const aspectRatio = width / 375;

const palette = {
  softWhite: '#f5f4ee',
  dirtyWhite: '#f9f9f9',
  lightOrange: '#e4d6cc',
  orange: '#f3d4c1',
  darkOrange: '#ffad8b',
  yellow: '#fbe29f',
  fadeYellow: '#e1d1a6',
  lightViolet: '#d9dbed',
  violet: '#c1cbe7',
  lightBlue: '#BFEAF5',
  lightPink: '#eceae8',
  pink: '#ebb9cb',
  fadePink: '#d8c8bd',
  blue: '#c1cbe7',
  lightGreen: '#c9e5dc',
  green: '#94c7b6',
  fadeGreen: '#bedcd3',
  superLightGreen: '#bed8d1',
  fadeGray: '#dbdfe2',
  gray: '#222',
  midGray: '#646464',
  darkGray: '#2c2c2d',
  lightGray: '#d1d2d1',
  lightMidGray: '#d9dddc',
  red: 'red',
  warning: '#ff6666',
  linkColor: '#FF3366',
};

const PLAYGROUND_OVERLAY_BUTTONS = {
  left: {
    title: 'Ups',
    style: {
      label: {
        backgroundColor: '#ffad8b',
        color: '#222',
        borderColor: '#222',
        borderWidth: 0.5,
        fontSize: 18,
        fontFamily: 'YuseiMagic-Regular',
      },
      wrapper: {
        zIndex: 1000,
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        marginTop: 20,
        marginLeft: -20,
      },
    },
  },
  right: {
    title: 'Yay',
    style: {
      label: {
        backgroundColor: '#fbe29f',
        borderColor: '#222',
        color: '#222',
        borderWidth: 0.5,
        fontSize: 18,
        fontFamily: 'YuseiMagic-Regular',
      },
      wrapper: {
        zIndex: 1000,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 20,
        marginLeft: 20,
      },
    },
  },
};

const theme = {
  colors: {
    success: palette.green,
    error: palette.red,
    alert: palette.fadeYellow,
    good: palette.yellow,
    bad: palette.orange,
    warning: palette.orange,
    icon: palette.softWhite,
    p: palette.midGray,
    placeholder: palette.lightMidGray,
    border: palette.gray,
    lightBorder: palette.lightGray,
    background: palette.fadeGray,
    background2: palette.fadeGreen,
    background3: palette.gray,
    buttonBackground: palette.darkGray,
    buttonText: palette.lightGray,
    drawer: palette.dirtyWhite,
    list: [
      palette.softWhite,
      palette.lightOrange,
      palette.yellow,
      palette.orange,
      palette.superLightGreen,
      palette.violet,
    ],
    drawerItem: {
      home: palette.lightGreen,
      improve: palette.fadeYellow,
      feature: palette.darkOrange,
      share: palette.fadePink,
      rate: palette.lightPink,
      freeDeck: palette.lightViolet,
      upgrade: palette.green,
      contact: palette.blue,
      shop: palette.yellow,
    },
    linkColor: palette.linkColor,
    quoteBorder: palette.lightGray,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  borderRadius: {
    s: 4,
    m: 8,
    l: 25,
    xl: 75,
  },
  buttonShadow: {
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, 0.4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  iconButtonShadow: {
    ...Platform.select({
      android: {
        elevation: 4,
        shadowColor: 'rgba(0,0,0, .4)',
      },
      default: {
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 2, width: 2 },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
    }),
  },
  backgroundShadow: {
    ...Platform.select({
      android: {
        elevation: 5,
      },
      ios: {
        shadowColor: '#000',
        shadowRadius: 10,
        shadowOpacity: 0.2,
        shadowOffset: {
          width: 0,
          height: 10,
        },
      },
    }),
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  playgroundOverlayButtons: PLAYGROUND_OVERLAY_BUTTONS,
};

export default theme;
