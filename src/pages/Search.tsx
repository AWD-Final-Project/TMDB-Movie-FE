import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosClient from "../configs/axios";
import { IMovie } from "./Detail";
import { Container } from "@mui/material";

const Search = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [searchQuery, setSearchQuery] = useState(query || "");

  useEffect(() => {
    const searchMovie = async () => {
      try {
        const response = await axiosClient.get(
          `/movie/search?key_word=${query}`
        );
        const data = await response.data;
        setMovies(data.data);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    searchMovie();
  }, [query]);

  return (
    <div>
      <Container className="pb-10">
        <div className="relative border mb-8 rounded-full mt-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-3 px-4 rounded-full outline-none"
            placeholder="Search for a movie, tv show, person..."
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                navigate("/search?query=" + searchQuery);
              }
            }}
          />
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#1ed5a9] hover:text-black text-white py-3 px-6 rounded-full"
            onClick={() => navigate("/search?query=" + searchQuery)}
          >
            Search
          </button>
        </div>
        <div className="flex flex-col gap-5">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="border rounded-md shadow flex gap-4"
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w300_and_h450_multi_faces${movie?.poster_path}`}
                alt=""
                className="w-24 rounded-l-md"
              />
              <div className="mt-4">
                <h1 className="font-semibold text-lg">{movie.title}</h1>
                <span className="text-gray-500">{movie.release_date}</span>
                <p className="mt-2">{movie.overview}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Search;
