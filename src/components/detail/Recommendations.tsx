import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Recommendations = ({ genre, similar }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="my-4">
        <p className="text-lg font-semibold">Movies with the same genres</p>
        <div className="flex gap-5 mb-4 overflow-x-auto">
          {!genre || genre.length === 0 ? (
            <p className="pb-2">No movie with the same genres</p>
          ) : (
            genre.map((movie) => (
              <div
                key={movie.id}
                className="flex items-center my-4 flex-col w-40 cursor-pointer"
                onClick={() => navigate(`/movie/${movie._id}`)}
              >
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
      </div>
      <div className="my-4">
        <p className="text-lg font-semibold">Similar movies</p>
        <div className="flex gap-5 mb-4 overflow-x-auto">
          {!similar || similar.length === 0 ? (
            <p className="pb-2">No similar movie</p>
          ) : (
            similar.map((movie) => (
              <div
                key={movie.id}
                className="flex items-center my-4 flex-col w-40 cursor-pointer"
                onClick={() => navigate(`/movie/${movie._id}`)}
              >
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
      </div>
    </>
  );
};

export default Recommendations;
