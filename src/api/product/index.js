import axios from "axios";
// const PORT = "http://localhost:8000";
const PORT = import.meta.env.VITE_API_KEY;

export const getAllProducts = async (queryParams) => {
  return axios.get(`${PORT}/api/v1/product`, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    params: queryParams,
  });
};

export const getProductById = async (id, token) => {
  return axios.get(`${PORT}/api/v1/product/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};

export const createProduct = async (data, token) => {
  return axios.post(`${PORT}/api/v1/product`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: token,
    },
  });
};

export const updateProduct = async (data, id, token) => {
  return axios.put(`${PORT}/api/v1/product/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: token,
    },
  });
};

export const deleteProduct = async (id, token) => {
  return axios.delete(`${PORT}/api/v1/product/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};
