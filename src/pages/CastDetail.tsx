import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ICast } from "../interfaces";
import axiosClient from "../configs/axios";
import { SyncLoader } from "react-spinners";
import classNames from "classnames";

const CastDetail = () => {
  const { id } = useParams();
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

  return <div>CastDetail</div>;
};

export default CastDetail;
