import { useNavigate } from "react-router-dom";
import { IMovie } from "../../interfaces";
import { Container, Typography } from "@mui/material";
import { FaArrowRight } from "react-icons/fa";

const CastList = ({ movie }: { movie: IMovie }) => {
  const navigate = useNavigate();

  return (
    <div>
      <Container className="pt-4">
        <div className="flex gap-4">
          <Typography variant="h5">Top Cast</Typography>
        </div>
        <div className="flex gap-5 mb-4 overflow-x-auto">
          {movie.credits.cast.slice(0, 10).map((actor) => (
            <div
              key={actor.id}
              className="flex items-center my-4 flex-col w-40 cursor-pointer"
              onClick={() => navigate(`/person/${actor.id}`)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w300_and_h450_multi_faces${actor.profile_path}`}
                alt={actor.name}
                className="w-[300px] object-cover rounded-md cursor-pointer"
              />
              <div className="ml-3 w-full relative">
                <Typography className="text-ellipsis text-nowrap overflow-hidden mt-1 w-40">
                  {actor.name}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {actor.character}
                </Typography>
              </div>
            </div>
          ))}
          {movie.credits.cast.length > 10 && (
            <div
              className="flex items-center gap-2 my-4 w-40 cursor-pointer"
              onClick={() =>
                navigate(`/movie/${movie._id}?tmdb_id=${movie.tmdb_id}/cast`)
              }
            >
              <div className="text-nowrap">View More</div>
              <FaArrowRight />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default CastList;
