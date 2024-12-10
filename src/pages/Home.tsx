import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axiosClient from "../configs/axios";
import { IMovie } from "./Detail";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

const Home = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [trendingType, setTrendingType] = useState("today");
  const [query, setQuery] = useState("");

  const fetchTrendingMovies = async (type: string) => {
    try {
      const response = await axiosClient.get("/movie/trending/" + type);
      const data = await response.data;
      setMovies(data.data);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    }
  };

  useEffect(() => {
    fetchTrendingMovies(trendingType);
  }, [trendingType]);

  return (
    <div>
      <div className="h-[300px] object-cover bg-[url(https://4kwallpapers.com/images/walls/thumbs_3t/18419.jpeg)]">
        <Container className="py-10">
          <Typography
            variant="h4"
            color="white"
            sx={{
              position: "relative",
            }}
          >
            Welcome.
            <br />
            Millions of movies, TV shows and people to discover. Explore now.
          </Typography>
          <div className="mt-14 relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full py-3 px-4 rounded-full outline-none"
              placeholder="Search for a movie, tv show, person..."
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  navigate("/search?query=" + query);
                }
              }}
            />
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#1ed5a9] hover:text-black text-white py-3 px-6 rounded-full"
              onClick={() => navigate("/search?query=" + query)}
            >
              Search
            </button>
          </div>
        </Container>
      </div>
      <div className="">
        <Container className="pt-8">
          <div className="flex gap-4">
            <Typography variant="h5">Trending</Typography>
            <div className="rounded-full border border-[#032541] flex items-center">
              <span
                className={classNames(
                  "px-4 rounded-full h-full flex items-center",
                  {
                    "bg-[#032541] text-white": trendingType === "today",
                  }
                )}
                onClick={() => setTrendingType("today")}
              >
                Today
              </span>
              <span
                className={classNames(
                  "px-4 rounded-full h-full flex items-center",
                  {
                    "bg-[#032541] text-white": trendingType === "thisweek",
                  }
                )}
                onClick={() => setTrendingType("thisweek")}
              >
                This Week
              </span>
            </div>
          </div>
          <div className="flex gap-5 mb-4 overflow-x-scroll">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="flex items-center my-4 flex-col w-40 cursor-pointer"
                onClick={() => navigate(`/movie/${movie.id}`)}
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
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Home;
