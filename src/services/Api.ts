import axios, {AxiosResponse, AxiosRequestConfig} from 'axios';
import {BASE_URL} from '../constants/Endpoints';

// Create an Axios instance with a base URL and timeout
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

/**
 * Make a GET request to the specified endpoint.
 * @param endpoint - The API endpoint to request.
 * @param signal - The AbortSignal to allow cancellation of the request.
 * @param config - Additional configuration options for the Axios request.
 * @returns A Promise resolving to the response data.
 * @throws Throws an error if the request fails.
 */

const get = async <T>(endpoint: string, signal: AbortSignal): Promise<T> => {
  try {
    const config: AxiosRequestConfig = {
      signal,
    };

    const response: AxiosResponse<T> = await api.get<T>(endpoint, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export {get};
