import type { ColorSchemeName, ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';

export type ColorScheme = ColorSchemeName;

export type TwStyle =
  | string
  | { [k: string]: boolean }
  | RnStyleProp<ViewStyle>
  | RnStyleProp<TextStyle>
  | RnStyleProp<ImageStyle>;

export type WithTwStyle<T> = T extends { style?: any }
  ? Omit<T, 'style'> & { style?: TwStyle }
  : T & { style?: TwStyle };

type RnStyleProp<T> = T | StyleProp<T>;
