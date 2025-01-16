import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMovie } from "../../interfaces";
import axiosClient from "../../configs/axios";
import { Container, Typography } from "@mui/material";
import { SyncLoader } from "react-spinners";
import { FaCross } from "react-icons/fa";
import { CiCircleRemove } from "react-icons/ci";
import { IoIosRemoveCircle } from "react-icons/io";

const WatchList = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFavoriteMovies = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get("/user/watchlist-movies");
      const data = await response.data;
      setMovies(data.data);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavoriteMovies();
  }, []);

  return (
    <div>
      <Container className="p-0">
        <Typography variant="h6">Watchlist Movies</Typography>
        <div className="flex gap-5 mb-4 overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center w-full h-[350px]">
              <SyncLoader color="#1ed5a9" />
            </div>
          ) : movies.length === 0 ? (
            <p className="pb-2">No movies in watchlist</p>
          ) : (
            movies.map((movie) => (
              <div
                key={movie.id}
                className="flex items-center my-4 flex-col w-40 cursor-pointer relative"
                onClick={() => navigate(`/movie/${movie._id}`)}
              >
                <div className="absolute top-0 right-0">
                  <button
                    onClick={async (e) => {
                      e.stopPropagation();
                      await axiosClient.delete(`/user/remove-from-watchlist`, {
                        data: { movieId: movie.tmdb_id },
                      });
                      fetchFavoriteMovies();
                    }}
                  >
                    <IoIosRemoveCircle size={20} color="#1ed5a9" />
                  </button>
                </div>
                <img
                  src={`https://image.tmdb.org/t/p/w300_and_h450_multi_faces${movie?.poster_path}`}
                  alt={movie.title}
                  className="w-[300px]  object-cover rounded-md"
                />
                <div className="ml-3 w-full relative">
                  <div className="w-9 h-9 absolute top-[-18px] rounded-full bg-black border-[3px] border-[#1ed5a9] text-white flex items-center justify-center">
                    {Math.round(movie.vote_average * 10)}
                  </div>
                  <Typography className="text-ellipsis text-nowrap overflow-hidden mt-5 w-40">
                    {movie.title}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {movie.release_date}
                  </Typography>
                </div>
              </div>
            ))
          )}
        </div>
      </Container>
    </div>
  );
};

export default WatchList;
