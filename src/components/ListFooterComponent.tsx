/**
 * ListFooterComponent
 *
 * The ListFooterComponent is a simple component displayed at the end of a list to indicate
 * that the user has reached the end of the content.
 *
 * @component
 *
 * @returns {ReactNode} - The rendered ListFooterComponent.
 */

import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';
import {useAppTheme} from '../theme/Theme';

const ListFooterComponent = () => {
  // Accessing app theme colors using the useAppTheme hook
  const {colors} = useAppTheme();

  return (
    <View style={styles.container}>
      {/* Displaying the end-of-list message with color based on the theme */}
      <Text style={{color: colors.onSurfaceDisabled}} variant="bodyMedium">
        You've reached the end of the list
      </Text>
    </View>
  );
};

export default ListFooterComponent;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
