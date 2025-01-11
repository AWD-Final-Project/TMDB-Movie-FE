import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMovie } from "../interfaces/video";
import axiosClient from "../configs/axios";
import { SyncLoader } from "react-spinners";
import classNames from "classnames";
import { Container } from "@mui/material";
import { FaArrowLeft } from "react-icons/fa";

const ReviewPage = () => {
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
          {movie.reviews.map((review) => (
            <div className="">
              <div key={review._id} className="my-4 rounded-lg shadow p-4">
                <div className="flex">
                  <img
                    src={
                      "https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/" +
                      review.author_details.avatar_path
                    }
                    className="w-12 h-12 rounded-full object-cover"
                    alt=""
                  />
                  <div className="ml-4">
                    <p className="text-lg font-semibold">
                      A review by {review.author}
                    </p>
                  </div>
                </div>
                <p className="mt-4 h-[100px] overflow-hidden text-ellipsis line-clamp-4">
                  {review.content}
                </p>
              </div>
            </div>
          ))}
        </Container>
      </div>
    </div>
  );
};

export default ReviewPage;
