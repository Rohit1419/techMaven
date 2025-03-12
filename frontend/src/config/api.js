const baseURL =
  process.env.NODE_ENV === "development" ? "http://localhost:5000/api" : "/api";

export default baseURL;
