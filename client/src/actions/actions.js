import axios from "axios";
import * as actionTypes from "./actionTypes";

export const signupSuccess = (data) => {
  return { type: actionTypes.AUTH_USER, paylaod: data };
};

export const loginSuccess = (data) => {
  return { type: actionTypes.AUTH_USER, paylaod: data };
};

export const authError = () => {
  return { type: actionTypes.AUTH_ERROR, paylaod: "INVALID TOKEN" };
};

export const logout = () => {
  localStorage.removeItem("token")
  return { type: actionTypes.AUTH_USER, paylaod: "" };
};

export const signup = (userData) => {
  return async (dispatch) => {
    try {
      //request to backend and get token
      const response = await axios.post(
        "http://localhost:3090/signup",
        userData
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      dispatch(signupSuccess(token));
    } catch (err) {
      dispatch(authError);
    }
  };
};

export const login = (userData) => {
  return async (dispatch) => {
    try {
      //request to backend and get token
      const response = await axios.post(
        "http://localhost:3090/signin",
        userData
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      dispatch(signupSuccess(userData));
    } catch (err) {
      dispatch(authError);
    }
  };
};
