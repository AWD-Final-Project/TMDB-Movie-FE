import { Container, Typography } from "@mui/material";

const Home = () => {
  const movies = [
    {
      id: 1,
      title: "The Shawshank Redemption",
      year: 1994,
      rating: 9.3,
      thumbnail:
        "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    },
    {
      id: 2,
      title: "The Godfather",
      year: 1972,
      rating: 9.2,
      thumbnail:
        "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
    },
    {
      id: 3,
      title: "The Dark Knight",
      year: 2008,
      rating: 9,
      thumbnail:
        "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
    },
  ];

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
              className="w-full py-3 px-4 rounded-full outline-none"
              placeholder="Search for a movie, tv show, person..."
            />
            <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#1ed5a9] hover:text-black text-white py-3 px-6 rounded-full">
              Search
            </button>
          </div>
        </Container>
      </div>
      <div className="">
        <Container className="pt-8">
          <Typography variant="h5">Trending</Typography>
          <div className="flex gap-5">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="flex items-center my-4 flex-col w-40"
              >
                <img
                  src={movie.thumbnail}
                  alt={movie.title}
                  className="w-40  object-cover rounded-md"
                />
                <div className="ml-3 w-full relative">
                  <div className="w-9 h-9 absolute top-[-18px] rounded-full bg-black border-[3px] border-[#1ed5a9] text-white flex items-center justify-center">
                    {movie.rating}
                  </div>
                  <Typography className="text-ellipsis text-nowrap overflow-hidden mt-5">
                    {movie.title}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {movie.year}
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
