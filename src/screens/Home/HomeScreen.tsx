/**
 * HomeScreen Component
 *
 * The HomeScreen component represents the main screen of the application where users can
 * search for movies and view a list of search results. It includes search functionality,
 * a list of movie items, and navigation to the ViewerScreen for detailed movie information.
 *
 * @component
 *
 * @returns {ReactNode} - The rendered HomeScreen component.
 */

import {RefreshControl, StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {getMoviesList} from '../../services/Services';
import ResponseType, {MovieType} from '../../models/ResponseType';
import Toast from 'react-native-toast-message';
import Wrapper from '../../components/Wrapper';
import {Searchbar, Text, TouchableRipple} from 'react-native-paper';
import {useAppTheme} from '../../theme/Theme';
import {FlashList} from '@shopify/flash-list';
import FastImage from 'react-native-fast-image';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {MODALS, SCREENS, STRINGS} from '../../constants/AppConstants';
import CustomActivityIndicator from '../../components/CustomActivityIndicator';
import {useDispatch} from 'react-redux';
import {storeMovieInfo} from '../../store/Reducer';
import ListFooterComponent from '../../components/ListFooterComponent';
import {isConnected} from '../../helpers/NetworkUtils';

const HomeScreen = () => {
  const {colors} = useAppTheme();
  const {navigate} = useNavigation();
  const dispatch = useDispatch();

  const controller = useRef(new AbortController());
  const [searchQuery, setSearchQuery] = useState('');
  const [searchValue, setSearchValue] = useState('spider');
  const [data, setData] = useState<MovieType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //Fetching the data from the API
  const fetchData = async () => {
    try {
      const connectionStatus: any = await isConnected();
      console.log('Connection---', connectionStatus);

      if (connectionStatus) {
        setIsLoading(prev => !prev);
        const {response, message, isError}: ResponseType = await getMoviesList(
          searchValue,
          controller.current.signal,
        );
        if (!isError) {
          setData(response.data);
          Toast.show({
            type: 'successToast',
            text1: 'Sucess',
            text2: message,
          });
          setIsLoading(prev => !prev);
        } else {
          setIsLoading(prev => !prev);
          Toast.show({
            type: 'errorToast',
            text1: 'Oops!',
            text2: message,
          });
        }
      } else {
        // @ts-ignore
        navigate(MODALS.FALLBACK_MODAL);
      }
    } catch (error) {
      setIsLoading(prev => !prev);
      console.log('errorssssss', error);
      const {message}: any = error;
      Toast.show({
        type: 'errorToast',
        text1: 'Oops!',
        text2: message,
      });
    }
  };
  // Initial Function call
  useFocusEffect(
    useCallback(() => {
      fetchData();
      return () => {
        // Aborting the current progressing API calls
        controller.current.abort();
      };
    }, [searchValue]),
  );

  //Executed when the user utilising the pull to refresh functionality
  const handleRefresh = useCallback(() => {
    handleClearSearch();
    setSearchQuery('');
    fetchData();
  }, []);

  // Component for pull to refresh functionality
  const handleRefreshControl = (
    <RefreshControl refreshing={false} onRefresh={handleRefresh} />
  );

  // Movie list item with press to view feature
  const renderMovieItem = ({item, index}: any) => {
    return (
      <TouchableRipple
        onPress={() => handlePress(item)}
        style={styles.itemContainer}>
        <>
          <View style={styles.posterContainer}>
            {item.Poster != 'N/A' ? (
              <FastImage
                style={styles.poster}
                source={{
                  uri: item.Poster,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
            ) : null}
            {item.Poster == 'N/A' ? (
              <View
                style={[
                  styles.emptyPoster,
                  {backgroundColor: colors.surfaceDisabled},
                ]}
              />
            ) : null}
          </View>
          <View style={styles.itemDescriptionContainer}>
            <Text variant="titleMedium">{item.Title}</Text>
            <Text variant="bodyLarge">{item.Year}</Text>
            <Text variant="bodyMedium">{item.Type}</Text>
          </View>
        </>
      </TouchableRipple>
    );
  };

  // Executes when the user press clear button in the search
  const handleClearSearch = () => {
    setSearchValue('spider');
  };
  // Executes when the user press enter button from keyboard
  const handleSubmitEditing = () => {
    if (searchQuery == '') {
      setSearchValue('spider');
    } else {
      setSearchValue(searchQuery);
    }
  };

  //Footer component for flashlist
  const listFooterComponent = useCallback(() => {
    return data && !isLoading ? <ListFooterComponent /> : null;
  }, []);

  //Executes when user press any item
  const handlePress = (item: MovieType) => {
    dispatch(storeMovieInfo(item));
    // @ts-ignore
    navigate(SCREENS.VIEWER_SCREEN);
  };
  return (
    <Wrapper>
      <View style={styles.container}>
        <Text variant="headlineMedium">{STRINGS.SEARCH}</Text>
        <Searchbar
          mode="bar"
          style={[
            styles.searchbar,
            {
              backgroundColor: colors.background,
              borderBottomColor: colors.onSurfaceDisabled,
            },
          ]}
          placeholder="Spiderman"
          placeholderTextColor={colors.onSurfaceDisabled}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSubmitEditing}
          value={searchQuery}
          onClearIconPress={handleClearSearch}
        />
        <View style={styles.listContainer}>
          <FlashList
            data={data}
            keyExtractor={(item, index) => item.imdbID}
            renderItem={renderMovieItem}
            estimatedItemSize={100}
            ListFooterComponent={listFooterComponent}
            refreshControl={handleRefreshControl}
          />
        </View>
      </View>
      {isLoading && <CustomActivityIndicator />}
    </Wrapper>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 18,
  },
  searchbar: {
    borderBottomWidth: 0.6,
    borderRadius: 0,
    marginTop: 12,
  },
  listContainer: {
    marginTop: 12,
    minHeight: '80%',
  },
  itemContainer: {
    paddingVertical: 12,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  posterContainer: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  poster: {
    width: 80,
    height: 118,
    borderRadius: 8,
    overflow: 'hidden',
  },
  emptyPoster: {
    width: 80,
    height: 118,
    borderRadius: 8,
  },
  itemDescriptionContainer: {width: '70%'},
});
