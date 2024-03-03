/**
 * NetworkUtils
 *
 * This module provides utility functions related to network connectivity using the
 * '@react-native-community/netinfo' library.
 *
 * @module
 */

import NetInfo from '@react-native-community/netinfo';

/**
 * isConnected Function
 *
 * Checks the current network connectivity status and returns a Promise with a boolean value.
 *
 * @async
 * @returns {Promise<boolean | null>} - A Promise that resolves to the current network connectivity status.
 */
export const isConnected = async (): Promise<boolean | null> => {
  const state = await NetInfo.fetch();
  return state.isConnected;
};
