import jwtDecode from "jwt-decode";
import httpService from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/users/";
const tokenKey = "token";
const authHeader = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};

httpService.setJwt(getJwt());

// login a user and save its jwt to localstorage.
export async function login(email, password) {
  const { data } = await httpService.post(apiEndpoint + "login", {
    email,
    password,
  });
  const jwt = data.token;
  const user = data.user;
  localStorage.setItem(tokenKey, jwt);
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
    const user = await httpService.get(apiEndpoint + "me", {
      headers: authHeader,
    });
    return user;
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
