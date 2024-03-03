/**
 * Wrapper Component
 *
 * The Wrapper component is responsible for rendering and managing background style.
 * It manages the dark and light theme of the app wide components.
 * It contains SafeAreaView from the react-native-safe-area-context hence no need to provide
 * it explicitly on any component which uses this component.
 *
 * NOTE: This component is an integral part of the app wide theme management and you must need to
 * wrap your component with this component.
 *
 * @component
 *
 * @props {ReactNode} children - Basically your component view part which it wraps.
 * @props {StyleProp} style - Custom styling for your component which it wraps
 *
 * <Wrapper
 * style={{justfyContent: 'center', alignItems: 'center'}}
 * >
 * {<---Your compoenet children goes here--->}
 * </Wrapper>
 */

import {
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  useColorScheme,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAppTheme} from '../theme/Theme';

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  statusBarColor?: string;
}

const Wrapper: React.FC<Props> = ({children, style, statusBarColor}) => {
  const {colors} = useAppTheme();
  //To check whether the current mobile theme is light or dark
  const dark = useColorScheme() === 'dark';

  return (
    <SafeAreaView
      edges={['top', 'bottom']}
      style={[{flex: 1, backgroundColor: statusBarColor || colors.background}]}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle={!dark ? 'dark-content' : 'light-content'}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : undefined}
        style={[{flex: 1, backgroundColor: colors.background}, style]}>
        {children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
});

export default Wrapper;
