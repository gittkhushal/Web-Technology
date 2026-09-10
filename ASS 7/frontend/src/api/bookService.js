import api from "./axiosConfig";

export const getAllBooks = (keyword = "") => {
  return api.get("/books", { params: keyword ? { keyword } : {} });
};

export const getBookById = (id) => {
  return api.get(`/books/${id}`);
};

export const createBook = (bookDTO) => {
  return api.post("/books", bookDTO);
};

export const updateBook = (id, bookDTO) => {
  return api.put(`/books/${id}`, bookDTO);
};

export const deleteBook = (id) => {
  return api.delete(`/books/${id}`);
};
