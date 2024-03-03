/**
 * ResponseType Interface
 *
 * Represents the structure of a response object containing data and error-related information.
 *
 * @interface
 */
export default interface ResponseType {
  isError: boolean;
  response: IData;
  message: any;
}

/**
 * IData Interface
 *
 * Represents the structure of the data object within the ResponseType.
 *
 * @interface
 */
type IData = {
  data: any;
  message: string;
};

/**
 * MovieType Interface
 *
 * Represents the structure of a movie object containing basic details.
 *
 * @interface
 */
export interface MovieType {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

/**
 * Rating Interface
 *
 * Represents the structure of a movie rating object.
 *
 * @interface
 */
interface Rating {
  Source: string;
  Value: string;
}

/**
 * MovieDetails Interface
 *
 * Represents the structure of detailed information about a movie.
 *
 * @interface
 */
export interface MovieDetails {
  Actors: string;
  Awards: string;
  BoxOffice: string;
  Country: string;
  DVD: string;
  Director: string;
  Genre: string;
  Language: string;
  Metascore: string;
  Plot: string;
  Poster: string;
  Production: string;
  Rated: string;
  Ratings: Rating[];
  Released: string;
  Response: string;
  Runtime: string;
  Title: string;
  Type: string;
  Website: string;
  Writer: string;
  Year: string;
  imdbID: string;
  imdbRating: string;
  imdbVotes: string;
}
