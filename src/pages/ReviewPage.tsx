import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { IMovie } from "../interfaces";
import axiosClient from "../configs/axios";
import { CircleLoader, SyncLoader } from "react-spinners";
import classNames from "classnames";
import { Button, Container, Modal } from "@mui/material";
import { FaArrowLeft } from "react-icons/fa";

const ReviewPage = () => {
  const { id } = useParams();
  const [query] = useSearchParams();
  const tmdb_id = query.get("tmdbId");
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState<IMovie>();
  const [reviewModal, setReviewModal] = useState(false);
  const [isReviewLoading, setIsReviewLoading] = useState(false);

  const fetchMovieDetail = async () => {
    try {
      setIsLoading(true);
      const response = await axiosClient.get(`/movie/${id}`);

      const data = await response.data;
      setMovie(data.data);
    } catch (error) {
      const response = await axiosClient.get(`/movie/${tmdb_id}`);

      const data = await response.data;
      setMovie(data.data);
      console.error("Failed to fetch movie detail:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
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
          <div className="">
            <Button
              variant="contained"
              className="bg-[#1ed5a9] uppercase font-semibold whitespace-nowrap rounded-full"
              onClick={() => setReviewModal(true)}
            >
              Write review
            </Button>
            <Modal open={reviewModal} onClose={() => setReviewModal(false)}>
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white px-8 py-4 min-w-[600px] rounded-lg shadow-lg">
                  <h2 className="text-2xl font-semibold mb-4">
                    Write a review
                  </h2>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setIsReviewLoading(true);
                      await axiosClient.post(`/user/add-review`, {
                        movieId: movie.tmdb_id,
                        content: e.target[0].value,
                      });
                      setIsReviewLoading(false);
                      setReviewModal(false);
                      fetchMovieDetail();
                    }}
                  >
                    <div className="mb-4">
                      <label
                        htmlFor="content"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Content
                      </label>
                      <textarea
                        id="content"
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        rows={4}
                      ></textarea>
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-[#1ed5a9] text-white px-4 py-2 rounded-md"
                      >
                        {isReviewLoading ? <CircleLoader /> : "Submit"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </Modal>
          </div>
          <div className="flex flex-col gap-4">
            {movie.reviews.map((review) => (
              <div className="">
                <div key={review._id} className=" rounded-lg shadow p-4">
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
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ReviewPage;
