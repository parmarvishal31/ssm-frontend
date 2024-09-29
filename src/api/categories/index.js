import axios from "axios";
const PORT = "http://localhost:8000";
// const PORT = import.meta.env.VITE_API_KEY;

export const getAllCategories = async (token) => {
  return axios.get(`${PORT}/api/v1/category`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};

export const getCategorieById = async (id, token) => {
  return axios.get(`${PORT}/api/v1/category/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};

export const createCategory = async (data, token) => {
  return axios.post(`${PORT}/api/v1/category`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};
