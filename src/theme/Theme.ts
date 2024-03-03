import {DefaultTheme, MD3LightTheme, useTheme} from 'react-native-paper';
import {Dimensions, Platform} from 'react-native';

// Define a generic ThemeInterface with colors and fonts
export interface ThemeInterface<colors extends object, fonts extends object> {
  custom: string;
  colors: colors;
  dark?: boolean;
  fonts: object;
}

// Define the light theme with color overrides and font styles
const lightTheme = {
  ...MD3LightTheme,
  custom: 'property',
  colors: {
    ...MD3LightTheme.colors,
    primary: 'rgb(83, 85, 169)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(225, 224, 255)',
    onPrimaryContainer: 'rgb(10, 6, 100)',
    secondary: 'rgb(180, 36, 59)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(255, 218, 218)',
    onSecondaryContainer: 'rgb(64, 0, 11)',
    tertiary: 'rgb(0, 109, 59)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(153, 247, 181)',
    onTertiaryContainer: 'rgb(0, 33, 14)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(255, 251, 255)',
    onBackground: 'rgb(29, 29, 39)',
    surface: 'rgb(243, 245, 255)',
    onSurface: 'rgb(29, 29, 39)',
    surfaceVariant: 'rgb(228, 225, 236)',
    onSurfaceVariant: 'rgb(71, 70, 79)',
    outline: 'rgb(119, 118, 128)',
    outlineVariant: 'rgb(200, 197, 208)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(49, 48, 52)',
    inverseOnSurface: 'rgb(243, 239, 244)',
    inversePrimary: 'rgb(192, 193, 255)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(246, 243, 251)',
      level2: 'rgb(241, 238, 248)',
      level3: 'rgb(236, 233, 246)',
      level4: 'rgb(234, 231, 245)',
      level5: 'rgb(231, 228, 243)',
    },
    surfaceDisabled: 'rgba(28, 27, 31, 0.12)',
    onSurfaceDisabled: 'rgba(28, 27, 31, 0.38)',
    backdrop: 'rgba(48, 48, 56, 0.4)',
  },

  fonts: {
    // Font styles for different text sizes and types as per react native paper docs
    bodyLarge: {
      fontSize: DefaultTheme.fonts.bodyLarge.fontSize,
      fontFamily:
        Platform.OS == 'android' ? 'Poppins-Medium' : 'Poppins-Medium',
    },
    bodyMedium: {
      fontSize: DefaultTheme.fonts.bodyMedium.fontSize,
      fontFamily:
        Platform.OS == 'android' ? 'Poppins-Medium' : 'Poppins-Medium',
    },
    bodySmall: {
      fontSize: DefaultTheme.fonts.bodySmall.fontSize,
      fontFamily:
        Platform.OS == 'android' ? 'Poppins-Medium' : 'Poppins-Medium',
    },
    default: {
      ...DefaultTheme.fonts.default,
      fontFamily:
        Platform.OS == 'android' ? 'Poppins-Medium' : 'Poppins-Medium',
    },
    displayLarge: {
      fontSize: DefaultTheme.fonts.displayLarge.fontSize,
      fontFamily: Platform.OS == 'android' ? 'Poppins-Bold' : 'Poppins-Bold',
    },
    displayMedium: {
      fontSize: DefaultTheme.fonts.displayMedium.fontSize,
      fontFamily: Platform.OS == 'android' ? 'Poppins-Bold' : 'Poppins-Bold',
    },
    displaySmall: {
      fontSize: DefaultTheme.fonts.displaySmall.fontSize,
      fontFamily: Platform.OS == 'android' ? 'Poppins-Bold' : 'Poppins-Bold',
    },
    headlineLarge: {
      fontSize: DefaultTheme.fonts.headlineLarge.fontSize,
      fontFamily: Platform.OS == 'android' ? 'Poppins-Bold' : 'Poppins-Bold',
    },
    headlineMedium: {
      fontSize: DefaultTheme.fonts.headlineMedium.fontSize,
      fontFamily:
        Platform.OS == 'android' ? 'Poppins-SemiBold' : 'Poppins-SemiBold',
    },
    headlineSmall: {
      fontSize: DefaultTheme.fonts.headlineSmall.fontSize,
      fontFamily:
        Platform.OS == 'android' ? 'Poppins-SemiBold' : 'Poppins-SemiBold',
    },
    labelLarge: {
      fontSize: DefaultTheme.fonts.labelLarge.fontSize,
      fontFamily:
        Platform.OS == 'android' ? 'Poppins-Medium' : 'Poppins-Medium',
    },
    labelMedium: {
      fontSize: DefaultTheme.fonts.labelMedium.fontSize,
      fontFamily:
        Platform.OS == 'android' ? 'Poppins-Regular' : 'Poppins-Regular',
    },
    labelSmall: {
      fontSize: DefaultTheme.fonts.labelSmall.fontSize,
      fontFamily:
        Platform.OS == 'android' ? 'Poppins-Regular' : 'Poppins-Regular',
    },
    titleLarge: {
      fontSize: DefaultTheme.fonts.titleLarge.fontSize,
      fontFamily:
        Platform.OS == 'android' ? 'Poppins-SemiBold' : 'Poppins-SemiBold',
    },
    titleMedium: {
      fontSize: DefaultTheme.fonts.titleMedium.fontSize,
      fontFamily:
        Platform.OS == 'android' ? 'Poppins-SemiBold' : 'Poppins-SemiBold',
    },
    titleSmall: {
      fontSize: DefaultTheme.fonts.titleSmall.fontSize,
      fontFamily:
        Platform.OS == 'android' ? 'Poppins-SemiBold' : 'Poppins-SemiBold',
    },
  },
};

// Define the dark theme by extending the default theme and reusing lightTheme fonts
const darkTheme = {
  // Custom color overrides for dark theme
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(174, 198, 255)',
    onPrimary: 'rgb(0, 46, 105)',
    primaryContainer: 'rgb(5, 67, 148)',
    onPrimaryContainer: 'rgb(216, 226, 255)',
    secondary: 'rgb(187, 195, 255)',
    onSecondary: 'rgb(17, 34, 134)',
    secondaryContainer: 'rgb(45, 60, 156)',
    onSecondaryContainer: 'rgb(223, 224, 255)',
    tertiary: 'rgb(89, 219, 193)',
    onTertiary: 'rgb(0, 56, 46)',
    tertiaryContainer: 'rgb(0, 81, 68)',
    onTertiaryContainer: 'rgb(121, 248, 221)',
    error: 'rgb(255, 180, 171)',
    onError: 'rgb(105, 0, 5)',
    errorContainer: 'rgb(147, 0, 10)',
    onErrorContainer: 'rgb(255, 180, 171)',
    background: 'rgb(29, 29, 39)',
    onBackground: 'rgb(231, 225, 229)',
    surface: 'rgba(36,38,52,255)',
    onSurface: 'rgba(228,226,230,255)',
    surfaceVariant: 'rgba(46,50,66,255)',
    onSurfaceVariant: 'rgb(204, 196, 206)',
    outline: '#c7c7d2',
    outlineVariant: 'rgb(74, 69, 78)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(231, 225, 229)',
    inverseOnSurface: 'rgb(40, 43, 57)',
    inversePrimary: 'rgb(120, 69, 172)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(39, 35, 41)',
      level2: 'rgb(44, 40, 48)',
      level3: 'rgb(50, 44, 55)',
      level4: 'rgb(52, 46, 57)',
      level5: 'transparent',
    },
    surfaceDisabled: 'rgb(155, 157, 170)',
    onSurfaceDisabled: 'rgba(231, 225, 229, 0.38)',
    backdrop: 'rgba(43, 49, 54, 0.4)',
  },
  fonts: {...lightTheme.fonts},
};

// Create a type for the application theme based on lightTheme
export type AppTheme = typeof lightTheme;

// Hook to use the current theme throughout the application
export const useAppTheme = () => useTheme<AppTheme>();

// Define custom gradients for dark and light themes
export const darkGradient = [
  'rgba(29, 29, 39, 0.04)',
  'rgba(29, 29, 39, 0.08)',
  'rgba(29, 29, 39, 0.1)',
  'rgba(29, 29, 39, 0.2)',
  'rgba(29, 29, 39, 0.3)',
  'rgba(29, 29, 39, 0.4)',
  'rgba(29, 29, 39, 0.5)',
  'rgba(29, 29, 39, 0.6)',
  'rgba(29, 29, 39, 0.7)',
  'rgba(29, 29, 39, 0.8)',
  'rgba(29, 29, 39, 0.9)',
  'rgba(29, 29, 39, 0.98)',
  'rgba(29, 29, 39, 1)',
];

export const lightGradient = [
  'rgba(255, 251, 255, 0.04)',
  'rgba(255, 251, 255, 0.08)',
  'rgba(255, 251, 255, 0.1)',
  'rgba(255, 251, 255, 0.2)',
  'rgba(255, 251, 255, 0.3)',
  'rgba(255, 251, 255, 0.4)',
  'rgba(255, 251, 255, 0.5)',
  'rgba(255, 251, 255, 0.6)',
  'rgba(255, 251, 255, 0.7)',
  'rgba(255, 251, 255, 0.8)',
  'rgba(255, 251, 255, 0.9)',
  'rgba(255, 251, 255, 0.98)',
  'rgba(255, 251, 255, 1)',
];

// Check if the screen width is greater than or equal to 768 (tablet)
const isTablet = Dimensions.get('screen').width >= 768;

export {lightTheme, darkTheme, isTablet};
