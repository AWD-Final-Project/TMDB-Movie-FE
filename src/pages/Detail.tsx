import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axiosClient from "../configs/axios";
import { Container, Divider } from "@mui/material";
import classNames from "classnames";
import { IMovie } from "../interfaces";
import { FaEye, FaHeart, FaRegStar, FaStar } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import { SyncLoader } from "react-spinners";
import { useAuth } from "../contexts/AuthContext";
import CastList from "../components/detail/CastList";
import ReviewList from "../components/detail/ReviewList";

const Detail = () => {
  const { id } = useParams();
  const [query] = useSearchParams();
  const tmdb_id = query.get("tmdb_id");
  const [movie, setMovie] = useState<IMovie>();
  const [isRating, setIsRating] = useState(false);
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        setIsLoading(true);
        const response = await axiosClient.get(`/movie/${id}`);

        const data = await response.data;
        setMovie(data.data);
      } catch (error) {
        console.error("Failed to fetch movie detail:", error);
        const response = await axiosClient.get(`/movie/${tmdb_id}`);

        const data = await response.data;
        setMovie(data.data);
      } finally {
        const response = await axiosClient.get(`/user/my-vote-rating/${id}`);

        const data = await response.data.data;
        setMovie((prev) => prev && { ...prev, rating: data });
        setRating(data);
        setIsLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  const rateMovie = async (rate: number) => {
    try {
      await axiosClient.post(`/user/vote-rating`, {
        value: rate,
        movieId: id,
      });
    } catch (error) {
      console.error("Failed to rate movie:", error);
    } finally {
      setIsRating(false);
    }
  };

  const switchFavorite = async () => {
    try {
      if (movie?.is_favorite) {
        await axiosClient.delete(`/user/remove-from-favorite`, {
          data: { movieId: id },
        });
        setMovie((prev) => prev && { ...prev, is_favorite: false });
      } else {
        await axiosClient.post(`/user/add-to-favorite`, {
          movieId: id,
        });
        setMovie((prev) => prev && { ...prev, is_favorite: true });
      }
    } catch (error) {
      console.error("Failed to switch favorite:", error);
    }
  };

  const switchWatchlist = async () => {
    try {
      if (movie?.is_watchlist) {
        await axiosClient.delete(`/user/remove-from-watchlist`, {
          data: { movieId: id },
        });
        setMovie((prev) => prev && { ...prev, is_watchlist: false });
      } else {
        await axiosClient.post(`/user/add-to-watchlist`, {
          movieId: id,
        });
        setMovie((prev) => prev && { ...prev, is_watchlist: true });
      }
    } catch (error) {
      console.error("Failed to switch watchlist:", error);
    }
  };

  if (!movie)
    return isLoading ? (
      <div className="relative">
        <div
          className={classNames("h-[600px] flex items-center justify-center")}
        >
          <SyncLoader color="#1ed5a9" />
        </div>
      </div>
    ) : (
      <div className="relative">
        <div
          className={classNames("h-[600px] flex items-center justify-center")}
        >
          <p>Movie not found</p>
        </div>
      </div>
    );

  return (
    <div className="relative">
      <div
        style={{
          filter: "blur(1px)",
          backgroundImage: `url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie?.backdrop_path})`,
        }}
        className={classNames("h-[530px] ")}
      ></div>
      <div className="absolute top-0 left-0 right-0">
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
                  {Math.floor(Number(movie?.vote_average) * 10)}
                  <sup className="text-[8px]">%</sup>
                </div>
                <span>
                  User
                  <br />
                  Score
                </span>
                {isAuthenticated && (
                  <div className="ml-4 flex gap-4">
                    <div
                      data-tooltip-id="favorite"
                      className="w-10 h-10 rounded-full cursor-pointer bg-black flex items-center justify-center relative"
                      onClick={() => switchFavorite()}
                    >
                      <FaHeart
                        size={14}
                        color={movie?.is_favorite ? "red" : ""}
                      />
                      <Tooltip id="favorite">Mark as favorite</Tooltip>
                    </div>
                    <div
                      data-tooltip-id="watchlist"
                      className="w-10 h-10 rounded-full cursor-pointer bg-black flex items-center justify-center relative"
                      onClick={() => switchWatchlist()}
                    >
                      <FaEye
                        size={14}
                        color={movie?.is_watchlist ? "red" : ""}
                      />
                      <Tooltip id="watchlist">Add to watchlist</Tooltip>
                    </div>
                    <div
                      data-tooltip-id="rating"
                      className="w-10 h-10 rounded-full cursor-pointer bg-black flex items-center justify-center relative"
                      onClick={() => setIsRating(!isRating)}
                    >
                      <FaStar size={14} />
                      <Tooltip id="rating">{!isRating && "Rate it!"}</Tooltip>
                      {isRating && (
                        <>
                          <div className="absolute border-[10px] border-b-black top-10 border-transparent"></div>
                          <div className="absolute flex top-14 bg-black p-3  rounded-lg">
                            {[1, 2, 3, 4, 5].map((item) => (
                              <div
                                key={item}
                                onMouseEnter={() => setRating(item)}
                                onMouseLeave={() => setRating(movie.rating)}
                                onClick={() => rateMovie(item)}
                                className="cursor-pointer px-[2px]"
                              >
                                {item <= rating ? (
                                  <FaStar size={24} color="yellow" />
                                ) : (
                                  <FaRegStar size={24} />
                                )}
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
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
      <CastList movie={movie} />
      <Container>
        <Divider />
        <ReviewList reviews={movie?.reviews} movie_id={id as string} />
        <Divider />
      </Container>
    </div>
  );
};

export default Detail;
