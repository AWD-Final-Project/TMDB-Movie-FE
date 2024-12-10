import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../configs/axios";
import { Container } from "@mui/material";
import classNames from "classnames";

export interface IMovie {
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
  imdb_id: string;
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

const Detail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<IMovie | null>(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await axiosClient.get(`/movie/${id}`);

        const data = await response.data;
        setMovie(data.data);
      } catch (error) {
        console.error("Failed to fetch movie detail:", error);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (!movie)
    return (
      <div className="relative">
        <div
          style={{
            filter: "blur(2px)",
            backgroundImage: `url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie?.backdrop_path})`,
          }}
          className={classNames("h-[600px] ")}
        ></div>
      </div>
    );

  return (
    <div className="relative">
      <div
        style={{
          filter: "blur(2px)",
          backgroundImage: `url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie?.backdrop_path})`,
        }}
        className={classNames("h-[600px] ")}
      ></div>
      <div className="absolute top-0 left-0 right-0 bottom-0">
        <Container className="py-10">
          <div className="text-white flex gap-10">
            <img
              className="rounded-lg"
              src={`https://image.tmdb.org/t/p/w300_and_h450_multi_faces${movie?.poster_path}`}
              alt=""
            />
            <div className="flex flex-col">
              <div className="">
                <span className="text-4xl font-bold">{movie?.title} </span>
                <span className="text-4xl text-gray-400">
                  ({movie?.release_date.split("-")[0]})
                </span>
              </div>
              <div className="mt-5 flex items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-black border-[3px] border-[#1ed5a9] text-white flex items-center justify-center text-lg">
                  {Number(movie?.vote_average) * 10}
                  <sup className="text-[8px]">%</sup>
                </div>
                <span>
                  User
                  <br />
                  Score
                </span>
              </div>
              <div className="mt-6 flex flex-col">
                <span className="text-gray-300 italic">{movie?.tagline}</span>
                <span className="text-xl font-bold">Overview</span>
                <p className="mt-1">{movie?.overview}</p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Detail;
