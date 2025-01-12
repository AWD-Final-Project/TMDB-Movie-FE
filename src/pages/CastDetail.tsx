import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { ICast } from "../interfaces";
import axiosClient from "../configs/axios";
import { SyncLoader } from "react-spinners";
import classNames from "classnames";
import { Container, Divider } from "@mui/material";

const CastDetail = () => {
  const { id } = useParams();
  const [query] = useSearchParams();
  const tmdb_id = query.get("tmdb_id");
  const [cast, setCast] = useState<ICast>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCastDetail = async () => {
      try {
        setIsLoading(true);
        const response = await axiosClient.get(`/cast/${id}`);

        const data = await response.data;
        setCast(data.data);
      } catch (error) {
        console.error("Failed to fetch movie detail:", error);
        const response = await axiosClient.get(`/cast/${tmdb_id}`);

        const data = await response.data;
        setCast(data.data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCastDetail();
  }, [id]);

  if (!cast)
    return isLoading ? (
      <div className="relative">
        <div
          className={classNames("h-[600px] flex items-center justify-center")}
        >
          <SyncLoader color="#1ed5a9" />
        </div>
      </div>
    ) : (
      <div className="relative">
        <div
          className={classNames("h-[600px] flex items-center justify-center")}
        >
          <p>Cast not found</p>
        </div>
      </div>
    );

  return (
    <div className="relative">
      <Container className="py-10">
        <div className=" flex gap-10">
          <div className="w-[300px]">
            <img
              className="rounded-lg"
              src={`https://image.tmdb.org/t/p/w300_and_h450_multi_faces${cast?.profile_path}`}
              alt=""
            />
            <div className="">
              <p className="mt-8 text-lg font-semibold">Personal Info</p>
              <span className="font-semibold">Known For</span>
              <p className="text-sm">{cast.known_for_department}</p>

              <p className="font-semibold mt-4">Gender</p>
              <p className="text-sm">{cast.gender !== 1 ? "Male" : "Female"}</p>
              <p className="font-semibold mt-4">Birthday</p>
              <p className="text-sm">{cast.birthday}</p>
              <p className="font-semibold mt-4">Place of Birth</p>
              {cast.place_of_birth.length > 0 ? (
                <p className="text-sm">{cast.place_of_birth}</p>
              ) : (
                <p className="text-sm">N/A</p>
              )}

              <p className="font-semibold mt-4">Also Known As</p>
              {cast.also_known_as.length > 0 ? (
                <p className="text-sm">{cast.also_known_as.join(", ")}</p>
              ) : (
                <p className="text-sm">N/A</p>
              )}
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <span className="text-4xl font-bold">{cast.name} </span>
            <p className="mt-4 text-lg font-semibold">Biography</p>
            <p>{cast.biography}</p>
            <div className="mt-8">
              <p className="text-lg font-semibold">Acting</p>
              <div className="shadow mt-2">
                {cast.movie_credits?.cast.map((actor, index) => (
                  <>
                    {index > 0 && <Divider />}
                    <div key={actor.id} className="p-4 flex gap-6">
                      <span className="">{actor.release_date.slice(0, 4)}</span>
                      <div className="mt-[6px] w-3 h-3 rounded-full border-2 border-black"></div>
                      <div className="flex flex-col">
                        <span className="font-semibold">
                          {actor.character || "N/A"}
                        </span>
                        <span className="text-gray-400 ml-3">
                          as{" "}
                          <span className="text-gray-700">{actor.title}</span>
                        </span>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CastDetail;
