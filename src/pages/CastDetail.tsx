// const CastDetail = () => {
//   const { id } = useParams();
//   const [movie, setMovie] = useState<IMovie>();
//   const [isRating, setIsRating] = useState(false);
//   const [rating, setRating] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);

//   const { isAuthenticated } = useAuth();

//   useEffect(() => {
//     const fetchMovieDetail = async () => {
//       try {
//         setIsLoading(true);
//         const response = await axiosClient.get(`/movie/${id}`);

//         const data = await response.data;
//         setMovie(data.data);
//       } catch (error) {
//         console.error("Failed to fetch movie detail:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchMovieDetail();
//   }, [id]);

//   return <div>CastDetail</div>;
// };

// export default CastDetail;
