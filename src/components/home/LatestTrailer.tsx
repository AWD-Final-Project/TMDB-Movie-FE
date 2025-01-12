import { Box, Container, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import axiosClient from "../../configs/axios";
import { IMovie } from "../../interfaces";
import { FaPlay } from "react-icons/fa";
import YouTube from "react-youtube";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "8px",
  boxShadow: 24,
};

const LatestTrailer = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [trailer, setTrailer] = useState({
    isOpen: false,
    videoId: "",
  });

  const fetchPopularMovies = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get("/movie/lastest-trailer");
      const data = await response.data;
      setMovies(data.data);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  return (
    <div className="text-white object-cover bg-[url(https://4kwallpapers.com/images/walls/thumbs_3t/18419.jpeg)]">
      <Container className="pt-8">
        <div className="flex gap-4">
          <Typography variant="h5">Latest Trailers</Typography>
        </div>
        <div className="flex gap-5 mb-4 overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center w-full h-[350px]">
              <SyncLoader color="#1ed5a9" />
            </div>
          ) : (
            movies.map((movie) => (
              <div
                key={movie.id}
                className="flex items-center my-4 flex-col w-40 cursor-pointer relative"
                onClick={() => {
                  setTrailer({
                    isOpen: true,
                    videoId: movie.youtubeTrailerURL.split("v=")[1],
                  });
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w300_and_h450_multi_faces${movie?.poster_path}`}
                  alt={movie.title}
                  className="w-40  object-cover rounded-md"
                />
                <div className="ml-3 w-full relative text-center">
                  <Typography className="text-ellipsis text-nowrap overflow-hidden mt-3 w-40">
                    {movie.title}
                  </Typography>
                </div>
                <div className="absolute top-[40%]">
                  <FaPlay color="white" size={40} />
                </div>
              </div>
            ))
          )}
        </div>
      </Container>
      <Modal
        open={trailer.isOpen}
        onClose={() => setTrailer({ isOpen: false, videoId: "" })}
      >
        <Box sx={style}>
          <YouTube videoId={trailer.videoId} />
        </Box>
      </Modal>
    </div>
  );
};

export default LatestTrailer;
