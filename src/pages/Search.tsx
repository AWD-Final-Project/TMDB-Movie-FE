import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosClient from "../configs/axios";
import { Container, MenuItem, Select } from "@mui/material";
import classNames from "classnames";
import { SyncLoader } from "react-spinners";
import { IMovie } from "../interfaces/video";

const Search = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const language = searchParams.get("language") || "all";
  const year = searchParams.get("year") || "all";
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [searchQuery, setSearchQuery] = useState(query || "");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchMovie = async () => {
      try {
        setLoading(true);
        let queryString = `/movie/search?key_word=${query}&page=${page}`;
        if (language !== "all") {
          queryString += `&language=${language}`;
        }
        if (year !== "all") {
          queryString += `&year=${year}`;
        }
        const response = await axiosClient.get(queryString);
        const data = await response.data;
        setMovies(data.data.movies);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setLoading(false);
      }
    };

    searchMovie();
  }, [query, page, language, year]);

  return (
    <div>
      <Container className="pb-10">
        <div className="relative border mb-2 rounded-full mt-2">
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

        <div className="mb-8 mx-4 flex gap-4">
          <div className="flex items-center gap-2">
            <h1 className="">Language</h1>
            <Select
              className=""
              size="small"
              value={language}
              onChange={(e) =>
                navigate(
                  e.target.value === "all"
                    ? `/search?query=${searchQuery}`
                    : `/search?query=${searchQuery}&language=${e.target.value}`
                )
              }
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="vi">Vietnamese</MenuItem>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="">Year</h1>
            <Select
              className=""
              size="small"
              value={year}
              onChange={(e) =>
                navigate(
                  e.target.value === "all"
                    ? `/search?query=${searchQuery}`
                    : `/search?query=${searchQuery}&year=${e.target.value}`
                )
              }
            >
              <MenuItem value="all">All</MenuItem>
              {Array.from({ length: 10 }, (_, index) => (
                <MenuItem value={new Date().getFullYear() - index}>
                  {new Date().getFullYear() - index}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center w-full h-[350px]">
            <SyncLoader color="#1ed5a9" />
          </div>
        ) : (
          <>
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
            {movies.length > 0 ? (
              <div className="flex justify-center gap-4 mt-4">
                <button
                  className={classNames({ hidden: page === 1 })}
                  onClick={() => setPage(page - 1)}
                >
                  Previous
                </button>

                {[
                  page - 2,
                  page - 1,
                  page,
                  ...(movies.length > 10 ? [page + 1, page + 2] : []),
                ].map((p) => {
                  if (p > 0)
                    return (
                      <button
                        key={p}
                        className={`${
                          page === p ? "bg-gray-300 rounded w-6 h-6" : ""
                        }`}
                        onClick={() => setPage(p)}
                      >
                        {p}
                      </button>
                    );
                })}

                <button
                  className={classNames({ hidden: movies.length < 10 })}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center w-full h-[350px]">
                <h1 className="text-xl">No results found</h1>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default Search;
