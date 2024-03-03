/**
 * ToastUI Component
 *
 * The ToastUI component is responsible for rendering toast notifications with customizable
 * content and styles based on the specified toast type (success, warning, error, or info).
 *
 * @component
 *
 * @props {string | null} heading - The primary heading text for the toast.
 * @props {string | null} description - The secondary description text for the toast.
 * @props {'success' | 'warning' | 'error' | 'info'} toastType - The type of toast (success, warning, error, or info).
 *
 * @returns {ReactNode} - The rendered ToastUI component.
 */

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useAppTheme} from '../theme/Theme';

interface Iprops {
  heading?: string | null;
  description?: string | null;
  toastType: 'success' | 'warning' | 'error' | 'info';
}

const ToastUI: React.FC<Iprops> = ({heading, description, toastType}) => {
  const {colors} = useAppTheme();

  /**
   * Color Picker Function
   *
   * This function maps the specified toast type to its corresponding background color.
   *
   * @param {string} toast - The type of toast (success, warning, error, or info).
   * @returns {string} - The background color for the specified toast type.
   */
  const colorPicker = (toast: any) => {
    switch (toast) {
      case 'success':
        return '#48aa5a';
      case 'error':
        return '#d34545';
      case 'info':
        return '#2a7cc7';
      case 'warning':
        return '#f08d02';
      default:
        break;
    }
  };

  return (
    <View
      style={{
        paddingVertical: description ? 16 : 20,
        width: '94%',
        backgroundColor: colorPicker(toastType),
        justifyContent: 'center',
        paddingHorizontal: 14,
        borderRadius: 8,
        marginTop: 12,
      }}>
      {heading && (
        <Text
          style={{
            color: '#fff',
            fontSize: 16,
            fontWeight: '600',
            fontFamily: 'Poppins-SemiBold',
          }}>
          {heading}
        </Text>
      )}
      {description && (
        <Text
          style={{
            color: '#fff',
            fontSize: 14,
            fontWeight: '500',
            fontFamily: 'Poppins-Medium',
          }}>
          {description}
        </Text>
      )}
    </View>
  );
};

export default ToastUI;

const styles = StyleSheet.create({});
