import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3000",
});

http.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    console.log(error);
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.reload();
    }
    return error;
  }
);

export const authenticate = (username, password) =>
  http.post("/auth", { username, password });

export const getTweets = () => http.get("tweets");
