export interface IMovie {
  _id: string;
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  tmdb_id: string;
  is_favorite: boolean;
  is_watchlist: boolean;
  reviews: IReview[];
  credits: {
    cast: ICast[];
    crew: ICrew[];
  };
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IReview {
  _id: string;
  user_id: string;
  movie_id: string;
  content: string;
  rating: number;
  created_at: string;
  updated_at: string;
  author_details: {
    avatar_path: string;
  };
  author: string;
}

export interface ICast {
  id: number;
  name: string;
  character: string;
  profile_path: string;
  credit_id: string;
  birthday: string;
  biography: string;
  movie_credits: {
    cast: ICast[];
  };
}

export interface ICrew {
  id: number;
  name: string;
  job: string;
  profile_path: string;
}
