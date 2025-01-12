import { useNavigate } from "react-router-dom";
import { IReview } from "../../interfaces";

const ReviewList = ({
  reviews,
  movie_id,
}: {
  reviews: IReview[];
  movie_id: string;
}) => {
  const navigate = useNavigate();

  return (
    <div className="my-4">
      <p className="text-lg font-semibold">
        Reviews <span className="text-gray-500">{reviews.length}</span>
      </p>
      {reviews.length > 0 && (
        <div className="">
          <div key={reviews[0]._id} className="my-4 rounded-lg shadow p-4">
            <div className="flex">
              <img
                src={
                  "https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/" +
                  reviews[0].author_details.avatar_path
                }
                className="w-12 h-12 rounded-full object-cover"
                alt=""
              />
              <div className="ml-4">
                <p className="text-lg font-semibold">
                  A review by {reviews[0].author}
                </p>
              </div>
            </div>
            <p className="mt-4 h-[100px] overflow-hidden text-ellipsis line-clamp-4">
              {reviews[0].content}
            </p>
          </div>
          <p
            className="cursor-pointer"
            onClick={() =>
              navigate(`/movie/${movie_id}?tmdb_id=${movie_id}/reviews`)
            }
          >
            See all reviews
          </p>
        </div>
      )}
    </div>
  );
};

export default ReviewList;
