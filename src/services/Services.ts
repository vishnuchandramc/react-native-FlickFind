/**
 * Fetches a list of movies based on the search criteria.
 * @param searchCriteria - The criteria used for searching movies.
 * @param signal - The AbortSignal to allow cancellation of the request.
 * @returns A Promise that resolves to the response data or rejects with an error.
 */
import {ERRORMESSAGES} from '../constants/AppConstants';
import {isConnected} from '../helpers/NetworkUtils';
import ResponseType from '../models/ResponseType';
import {API_KEY, BASE_URL} from '../constants/Endpoints';
import * as ApiServices from '../services/Api';

export const getMoviesList = async (
  searchCriteria: string,
  signal: any,
): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      // Check network connectivity
      const connectionStatus: any = await isConnected();
      if (connectionStatus) {
        // Make API request to fetch movies list
        const response = await ApiServices.get(
          `${BASE_URL}?s=${searchCriteria}&apikey=${API_KEY}`,
          signal,
        );
        console.log('data---', response);
        if (
          response &&
          typeof response === 'object' &&
          'Response' in response
        ) {
          if (response.Response === 'True') {
            if ('Search' in response) {
              let success: ResponseType = {
                isError: false,
                response: {data: response.Search, message: 'Success'},
                message: 'Data fetched successfully',
              };
              resolve(success);
            } else throw response;
          } else {
            if ('Error' in response) {
              let failed: ResponseType = {
                isError: true,
                response: {data: null, message: ''},
                message: response.Error || 'Unknown error',
              };
              reject(failed);
            } else throw response;
          }
        } else {
          let failed: ResponseType = {
            isError: true,
            response: {data: null, message: ''},
            message: 'Unexpected Error occured',
          };
          reject(failed);
        }
      } else {
        // No network connectivity
        let failed: ResponseType = {
          isError: true,
          response: {data: null, message: ''},
          message: ERRORMESSAGES.CHECK_NETWORK,
        };
        reject(failed);
      }
    } catch (error: any) {
      console.log('errror---', error);

      let failed: ResponseType = {
        isError: true,
        response: {data: null, message: ''},
        message: ERRORMESSAGES.SOMETHING_WENT_WRONG,
      };
      reject(failed);
    }
  });
};

export const getMovieDetails = async (
  id: string,
  signal: any,
): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const connectionStatus: any = isConnected();
      if (connectionStatus) {
        const response = await ApiServices.get(
          `${BASE_URL}/?i=${id}&apikey=${API_KEY}`,
          signal,
        );
        console.log('data---', response);
        if (response && typeof response === 'object') {
          let success: ResponseType = {
            isError: false,
            response: {data: response, message: 'Success'},
            message: 'Data fetched successfully',
          };
          resolve(success);
        } else {
          let failed: ResponseType = {
            isError: true,
            response: {data: null, message: ''},
            message: 'Unexpected Error occured',
          };
          reject(failed);
        }
      } else {
        let failed: ResponseType = {
          isError: true,
          response: {data: null, message: ''},
          message: ERRORMESSAGES.CHECK_NETWORK,
        };
        reject(failed);
      }
    } catch (error: any) {
      console.log('errror---', error);

      let failed: ResponseType = {
        isError: true,
        response: {data: null, message: ''},
        message: ERRORMESSAGES.SOMETHING_WENT_WRONG,
      };
      reject(failed);
    }
  });
};
