import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        const newToken = await axios.post(
          `${import.meta.env.VITE_API_URL}/user/invoke-new-tokens`,
          { refreshToken, userId: localStorage.getItem("userId") }
        );

        localStorage.setItem("token", newToken.data.accessToken);
        localStorage.setItem("refreshToken", newToken.data.refreshToken);

        return axiosClient.request(error.config);
      }
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosClient;
