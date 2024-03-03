/**
 * Toast Configuration
 *
 * This module defines a configuration object for customizing the appearance and behavior
 * of toast notifications using the `react-native-toast-message` library.
 *
 * The `toastConfig` object contains four functions, each corresponding to a different type
 * of toast: warning, info, error, and success. Each function takes an object with `text1` and
 * `text2` properties, which represent the primary heading and secondary description of the toast.
 * The functions return a `ToastUI` component with the specified type and content.
 *
 * Usage:
 * - Import the `ToastUI` component from the 'Toast' module.
 * - Use the `toastConfig` object to configure the appearance of different toast types.
 *
 * Example:
 * ```jsx
 * import {toastConfig} from './toastConfig';
 *
 * // In your component where you want to show a toast:
 * toast.show({
 *   type: 'info',
 *   text1: 'Information',
 *   text2: 'This is an informational message.',
 * });
 * ```
 */

import ToastUI from './Toast';

export const toastConfig = {
  /**
   * Warning Toast Configuration
   * @param {object} params - Object with `text1` and `text2` properties.
   * @returns {ReactNode} - ToastUI component for warning toast.
   */
  warningToast: ({text1, text2}: any) => (
    <ToastUI heading={text1} description={text2} toastType="warning" />
  ),

  /**
   * Information Toast Configuration
   * @param {object} params - Object with `text1` and `text2` properties.
   * @returns {ReactNode} - ToastUI component for info toast.
   */
  infoToast: ({text1, text2}: any) => (
    <ToastUI heading={text1} description={text2} toastType="info" />
  ),

  /**
   * Error Toast Configuration
   * @param {object} params - Object with `text1` and `text2` properties.
   * @returns {ReactNode} - ToastUI component for error toast.
   */
  errorToast: ({text1, text2}: any) => (
    <ToastUI heading={text1} description={text2} toastType="error" />
  ),

  /**
   * Success Toast Configuration
   * @param {object} params - Object with `text1` and `text2` properties.
   * @returns {ReactNode} - ToastUI component for success toast.
   */
  successToast: ({text1, text2}: any) => (
    <ToastUI heading={text1} description={text2} toastType="success" />
  ),
};
