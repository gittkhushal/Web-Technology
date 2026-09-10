import api from "./axiosConfig";

export const registerUser = (data) => {
  // data: { fullName, email, password }
  return api.post("/auth/register", data);
};

export const loginUser = (data) => {
  // data: { email, password }
  return api.post("/auth/login", data);
};
