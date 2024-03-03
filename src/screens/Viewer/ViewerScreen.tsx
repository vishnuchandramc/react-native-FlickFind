/**
 * ViewerScreen Component
 *
 * The ViewerScreen component displays detailed information about a specific movie.
 * It includes the movie's header, poster, ratings, and various details like plot, cast, awards, etc.
 *
 * @component
 *
 * @returns {ReactNode} - The rendered ViewerScreen component.
 */

import {
  Dimensions,
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Wrapper from '../../components/Wrapper';
import Toast from 'react-native-toast-message';

import {getMovieDetails} from '../../services/Services';
import {useNavigation, useRoute} from '@react-navigation/native';
import ResponseType, {MovieDetails} from '../../models/ResponseType';
import CustomActivityIndicator from '../../components/CustomActivityIndicator';
import FastImage from 'react-native-fast-image';
import {darkGradient, lightGradient, useAppTheme} from '../../theme/Theme';
import {Appbar, Chip, Text} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';

const ViewerScreen = () => {
  const {colors} = useAppTheme();
  const {goBack} = useNavigation();

  // Accessing movie details from the Redux store
  const params = useSelector((state: any) => state.movie?.movieItem);

  // Ref for aborting API calls on component unmount
  const controller = useRef(new AbortController());

  // State to manage loading state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //State to store the movie details
  const [data, setData] = useState<MovieDetails | null>(null);

  // Current theme based gradient display
  const gradient = useColorScheme() == 'dark' ? darkGradient : lightGradient;

  // Function to fetch movie details
  const fetchData = async () => {
    try {
      setIsLoading(prev => !prev);
      if (params) {
        const {imdbID} = params;
        const {response, message, isError}: ResponseType =
          await getMovieDetails(imdbID, controller.current.signal);

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
      } else throw {};
    } catch (error) {
      setIsLoading(prev => !prev);
      const {message}: any = error;
      Toast.show({
        type: 'errorToast',
        text1: 'Oops!',
        text2: message,
      });
    }
  };
  // useEffect to fetch data on component mount
  useEffect(() => {
    fetchData();
    return () => {
      // Aborting the current progressing API calls before component unmounts
      controller.current.abort();
    };
  }, []);

  // Array of genres split from the data (Genre given as a single string sepereted by comma)
  const genreArr = data?.Genre.replaceAll(' ', '').split(',');

  // Function to render genre chips
  const renderChip = ({item, index}: any) => {
    return (
      <Chip
        style={[styles.chipContainer, {borderColor: colors.surfaceDisabled}]}
        textStyle={{fontSize: 12}}>
        {item}
      </Chip>
    );
  };

  // Function to render ratings
  const renderRatings = ({item, index}: any) => {
    return (
      <View style={styles.ratingContainer}>
        <Text variant="titleMedium" style={styles.ratingText}>
          {item.Value}
        </Text>
        <Text variant="labelSmall" style={styles.ratingText}>
          {item.Source == 'Internet Movie Database' ? 'IMDB' : item.Source}
        </Text>
      </View>
    );
  };

  // Component to render each card section
  const RenderCard = ({title, description}: any) => {
    if (title) {
      return (
        <View style={styles.cardContainer}>
          <Text style={styles.card} variant="titleMedium">
            {title}
          </Text>
          <Text>{description}</Text>
        </View>
      );
    } else {
      return null;
    }
  };

  // Component to render the header with movie title, ratings, and genre chips
  const RenderHeader = () => {
    if (data) {
      return (
        <LinearGradient style={styles.fadeView} colors={gradient}>
          <View style={styles.ratedContainer}>
            <Text variant="titleMedium" style={{color: colors.background}}>
              {data.Rated}
            </Text>
          </View>
          <Text variant="headlineMedium">{data?.Title}</Text>
          <Text
            style={styles.yearTextStyle}
            variant="labelLarge">{`${data.Year}`}</Text>
          <Text
            style={styles.showTimeStyle}
            variant="labelLarge">{`${data.Runtime}`}</Text>
          <FlatList
            horizontal
            data={genreArr}
            keyExtractor={(item, index) => item.toString()}
            renderItem={renderChip}
          />

          <Text
            style={styles.directorTextStyle}
            variant="bodyMedium">{`Directed by ${data.Director}`}</Text>
        </LinearGradient>
      );
    } else return null;
  };

  return (
    <Wrapper>
      {/* Items won't display when the component in loading state */}
      {!isLoading ? (
        <ScrollView style={styles.container}>
          {data && data.Poster != 'N/A' ? (
            <ImageBackground
              style={styles.imageBackground}
              imageStyle={styles.imageStyle}
              resizeMode="cover"
              source={{uri: data.Poster}}>
              <Appbar.BackAction
                onPress={() => {
                  goBack();
                }}
              />
              {RenderHeader()}
            </ImageBackground>
          ) : null}
          {data && data.Poster == 'N/A' ? (
            <View
              style={[
                styles.imageBackground,
                {backgroundColor: colors.onSurfaceDisabled},
              ]}>
              <Appbar.BackAction
                onPress={() => {
                  goBack();
                }}
              />
              {RenderHeader()}
            </View>
          ) : null}
          <View
            style={[
              styles.ratingsContainer,
              {backgroundColor: colors.surface},
            ]}>
            {data?.Ratings && data?.Ratings.length > 0 ? (
              <FlatList
                horizontal
                data={data?.Ratings}
                renderItem={renderRatings}
                style={styles.ratings}
              />
            ) : null}
          </View>

          <RenderCard title={'Synopsis'} description={data?.Plot} />
          <RenderCard title={'Awards'} description={data?.Awards} />
          <RenderCard title={'Cast'} description={data?.Actors} />
          <RenderCard title={'Box Office'} description={data?.BoxOffice} />
          <RenderCard title={'Writer'} description={data?.Writer} />
          <RenderCard title={'Language'} description={data?.Language} />
          <RenderCard title={'Country'} description={data?.Country} />
          <RenderCard title={'Released On'} description={data?.Released} />
        </ScrollView>
      ) : null}

      {isLoading && <CustomActivityIndicator />}
    </Wrapper>
  );
};

export default ViewerScreen;

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  emptyPoster: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height * 0.6,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  chipContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,

    marginRight: 8,
    marginTop: 8,
    borderRadius: 8,
  },
  ratingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('screen').width / 3.5,
  },
  ratingText: {textAlign: 'center'},
  imageBackground: {
    height: Dimensions.get('screen').height * 0.6,
    width: Dimensions.get('screen').width,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  imageStyle: {
    width: '100%',
    height: Dimensions.get('screen').height * 0.6,
  },
  fadeView: {
    paddingTop: 160,
    paddingBottom: 20,
    paddingHorizontal: 20,
    width: '100%',
  },
  ratedContainer: {
    borderRadius: 6,
    backgroundColor: '#f08d02',
    flexWrap: 'nowrap',
    paddingVertical: 2,
    paddingHorizontal: 6,
    flexGrow: 0,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    marginBottom: 6,
    opacity: 0.8,
  },
  yearTextStyle: {paddingTop: 4},
  showTimeStyle: {paddingTop: 2},
  directorTextStyle: {paddingTop: 12},
  ratingsContainer: {
    marginHorizontal: 12,
    paddingHorizontal: 12,
    marginVertical: 8,
    paddingVertical: 18,
    borderRadius: 12,
  },
  ratings: {width: Dimensions.get('screen').width},
  cardContainer: {
    marginHorizontal: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  card: {paddingBottom: 4},
});
