import httpService from "./httpService";
import { apiUrl } from "../config.json";

// register endpoint.
const apiEndpoint = apiUrl + "/users";
const tokenKey = "token";

// register a user and save its jwt to localstorage.
export async function register(user) {
  const { data } = await httpService.post(apiEndpoint, {
    email: user.email,
    password: user.password,
  });
  const jwt = data.token;
  localStorage.setItem(tokenKey, jwt);
  return data.user;
}
