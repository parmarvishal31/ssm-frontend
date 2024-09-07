import axios from "axios";
// const PORT = "http://localhost:8000";
const PORT = import.meta.env.VITE_API_KEY;
const token = localStorage.getItem("token");

export const getAllCategories = async () => {
  return axios.get(`${PORT}/api/v1/category`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};

export const createCategory = async (data) => {
  return axios.post(`${PORT}/api/v1/category`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};
