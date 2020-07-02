import jwtDecode from "jwt-decode";
import httpService from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/users/";
const tokenKey = "token";

httpService.setJwt(getJwt());

// login a user and save its jwt to localstorage.
export async function login(email, password) {
  const { data } = await httpService.post(apiEndpoint + "login", {
    email,
    password,
  });

  const { token, user } = data;
  localStorage.setItem(tokenKey, token);
  return user;
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

// logut a user and remove its jwt from localstorage.
export function logout() {
  localStorage.removeItem(tokenKey);
}

// getting current user due to its jwt decoded information.
export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}
export async function getCurrentUserName() {
  try {
    const response = await httpService.get(apiEndpoint + "me", {
      headers: { Authorization: `Bearer ${getJwt()}` },
    });
    return response.data.email;
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getCurrentUserName,
  getJwt,
};
