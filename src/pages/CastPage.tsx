import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../configs/axios";
import { IMovie } from "../interfaces/video";
import { SyncLoader } from "react-spinners";
import classNames from "classnames";
import { Container } from "@mui/material";
import { FaArrowLeft } from "react-icons/fa";

const CastPage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState<IMovie>();

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        setIsLoading(true);
        const response = await axiosClient.get(`/movie/${id}`);

        const data = await response.data;
        setMovie(data.data);
      } catch (error) {
        console.error("Failed to fetch movie detail:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

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
      <div className="bg-gray-700">
        <Container className="py-5">
          <div className="text-white flex gap-6">
            <img
              className="rounded"
              src={`https://image.tmdb.org/t/p/w300_and_h450_multi_faces${movie?.poster_path}`}
              alt=""
              width={80}
            />
            <div className="flex flex-col justify-center gap-4">
              <div className="">
                <span className="text-4xl font-bold">{movie?.title} </span>
                <span className="text-4xl text-gray-400">
                  ({movie?.release_date.split("-")[0]})
                </span>
              </div>
              <div
                className="flex gap-1 items-center text-gray-400"
                onClick={() => window.history.back()}
              >
                <FaArrowLeft />
                <p>Back to main</p>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div className="">
        <Container className="py-5 flex gap-10">
          <div className="flex-1  ">
            <p className="text-xl font-semibold">
              Cast{" "}
              <span className="font-normal text-gray-500">
                {movie?.credits.cast.length}
              </span>
            </p>
            <div className="max-h-[500px] overflow-y-auto">
              {movie?.credits.cast.map((actor) => (
                <div key={actor.id} className="flex items-center my-4">
                  <img
                    src={`https://image.tmdb.org/t/p/w300_and_h450_multi_faces${actor.profile_path}`}
                    alt={actor.name}
                    className="object-cover rounded-md w-16 h-16"
                  />
                  <div className="ml-3 relative">
                    <p className="text-ellipsis text-nowrap overflow-hidden mt-1 w-40">
                      {actor.name}
                    </p>
                    <p className="text-gray-400">{actor.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 ">
            <p className="text-xl font-semibold">
              Crew{" "}
              <span className="font-normal text-gray-500">
                {movie?.credits.crew.length}
              </span>
            </p>
            <div className=" max-h-[500px] overflow-y-auto">
              {movie?.credits.crew.map((actor) => (
                <div key={actor.id} className="flex items-center my-4">
                  <img
                    src={`https://image.tmdb.org/t/p/w300_and_h450_multi_faces${actor.profile_path}`}
                    alt={actor.name}
                    className="object-cover rounded-md w-16 h-16"
                  />
                  <div className="ml-3 relative">
                    <p className="text-ellipsis text-nowrap overflow-hidden mt-1 w-40">
                      {actor.name}
                    </p>
                    <p className="text-gray-400">{actor.job}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default CastPage;
