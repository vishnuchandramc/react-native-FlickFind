/**
 * MainRoutes Component
 *
 * The MainRoutes component defines the main navigation stack using '@react-navigation/native-stack'.
 * It includes screens for the HomeScreen, ViewerScreen, and a fallback modal screen.
 *
 * @component
 *
 * @returns {ReactNode} - The rendered MainRoutes component.
 */

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {MODALS, SCREENS} from '../constants/AppConstants';
import HomeScreen from '../screens/Home/HomeScreen';
import ViewerScreen from '../screens/Viewer/ViewerScreen';
import FallBackModal from '../screens/modals/FallBackModal';

const MainRoutes = () => {
  // Creating a stack navigator using createNativeStackNavigator
  const MainStackNavigator = createNativeStackNavigator();

  return (
    <NavigationContainer>
      {/* Main Stack Navigator */}
      <MainStackNavigator.Navigator>
        {/* Home Screen */}
        <MainStackNavigator.Screen
          name={SCREENS.HOME_SCREEN}
          component={HomeScreen}
          options={() => ({
            headerShown: false,
          })}
        />
        {/* Viewer Screen */}
        <MainStackNavigator.Screen
          name={SCREENS.VIEWER_SCREEN}
          component={ViewerScreen}
          options={() => ({
            headerShown: false,
          })}
        />
        {/* Fallback Modal Screen */}
        <MainStackNavigator.Screen
          name={MODALS.FALLBACK_MODAL}
          component={FallBackModal}
          options={() => ({
            presentation: 'fullScreenModal',
            headerShown: false,
          })}
        />
      </MainStackNavigator.Navigator>
    </NavigationContainer>
  );
};

export default MainRoutes;

const styles = StyleSheet.create({});
