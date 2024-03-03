import {StyleSheet, Text, View, useColorScheme} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PaperProvider} from 'react-native-paper';
import * as customTheme from './src/theme/Theme';
import MainRoutes from './src/routes/MainRoutes';
import Toast from 'react-native-toast-message';
import {toastConfig} from './src/components/ToastConfig';
import {Provider} from 'react-redux';
import {store} from './src/store/StoreConfig';

const App = () => {
  const colorScheme = useColorScheme();
  const theme =
    colorScheme === 'dark' ? customTheme.darkTheme : customTheme.lightTheme;
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <MainRoutes />
          <Toast config={toastConfig} position="bottom" visibilityTime={1800} />
        </PaperProvider>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
