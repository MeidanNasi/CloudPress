import jwtDecode from "jwt-decode";
import httpService from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/users/";
const tokenKey = "token";

httpService.setJwt(getJwt());

// login a user and save its jwt to sessionStorage.
export async function login(email, password) {
  const { data } = await httpService.post(apiEndpoint + "login", {
    email,
    password,
  });

  const { token, user } = data;
  sessionStorage.setItem(tokenKey, token);
  return user;
}

export function loginWithJwt(jwt) {
  sessionStorage.setItem(tokenKey, jwt);
}

// logut a user and remove its jwt from sessionStorage.
export function logout() {
  sessionStorage.removeItem(tokenKey);
}

// getting current user due to its jwt decoded information.
export function getCurrentUser() {
  try {
    const jwt = sessionStorage.getItem(tokenKey);
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
  return sessionStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getCurrentUserName,
  getJwt,
};
