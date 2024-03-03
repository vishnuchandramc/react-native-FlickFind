/**
 * FallbackModal Component
 *
 * The FallbackModal component is displayed when there is no internet or issue connecting to the servers.
 * It provides options for the user to try again or open device settings.
 *
 * @component
 *
 * @returns {ReactNode} - The rendered FallbackModal component.
 */

import {StatusBar, StyleSheet, View, Platform, Linking} from 'react-native';
import React from 'react';
import {Button, Text} from 'react-native-paper';
import {useAppTheme} from '../../theme/Theme';
import {ERRORMESSAGES, STRINGS} from '../../constants/AppConstants';
import {useNavigation} from '@react-navigation/native';

const FallbackModal = () => {
  const {colors} = useAppTheme();
  const {goBack} = useNavigation();

  const handleOpenSettings = () => {
    // Function to open device settings based on platform
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  };

  const handleGoBack = () => {
    goBack();
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <StatusBar barStyle={'dark-content'} />
      <View
        style={{width: '80%', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{textAlign: 'center'}} variant="titleLarge">
          We couldn't connect to our servers
        </Text>
        <Text style={{textAlign: 'center'}}>
          {ERRORMESSAGES.TECHNICAL_DIFFICULTIES_ERROR}
        </Text>
      </View>
      <Button
        style={{marginTop: 40}}
        contentStyle={{backgroundColor: colors.primary}}
        mode="contained"
        onPress={handleGoBack}>
        <Text variant="bodyLarge" style={{color: colors.surface}}>
          Try again
        </Text>
      </Button>
      <Button style={{marginTop: 4}} onPress={handleOpenSettings}>
        Open Settings
      </Button>
    </View>
  );
};

export default FallbackModal;

const styles = StyleSheet.create({});
