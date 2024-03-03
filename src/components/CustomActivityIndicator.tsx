/**
 * CustomActivityIndicator Component
 *
 * The CustomActivityIndicator component is a reusable component for displaying
 * a loading spinner (ActivityIndicator) with customizable size and color.
 *
 * @component
 *
 * @props {number | 'small' | 'large'} size - The size of the activity indicator.
 * @props {string} color - The color of the activity indicator (overrides the theme color).
 *
 * @returns {ReactNode} - The rendered CustomActivityIndicator component.
 */

import React from 'react';
import {ActivityIndicator, useTheme} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';

type CustomActivityIndicatorProps = {
  size?: number | 'small' | 'large';
  color?: string;
};

const CustomActivityIndicator: React.FC<CustomActivityIndicatorProps> = ({
  size = 'small',
  color,
}) => {
  // Accessing theme colors using the useTheme hook from react-native-paper
  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      {/* Wrapper View with background color and styling */}
      <View
        style={[styles.wrapper, {backgroundColor: colors.primaryContainer}]}>
        {/* ActivityIndicator component with customizable size and color */}
        <ActivityIndicator size={size} color={color || colors.primary} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    zIndex: 99,
    flex: 1,
    justifyContent: 'center',
  },
  wrapper: {
    padding: 16,
    borderRadius: 10,
    opacity: 0.9,
  },
});

export default CustomActivityIndicator;
