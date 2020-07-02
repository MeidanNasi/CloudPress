import httpService from "./httpService";
import { apiUrl } from "../config.json";

// register endpoint.
const apiEndpoint = apiUrl + "/users";
const tokenKey = "token";

// register a user and save its jwt to sessionStorage.
export async function register(user) {
  const { data } = await httpService.post(apiEndpoint, {
    email: user.email,
    password: user.password,
  });
  console.log(data);
  const jwt = data.token;
  sessionStorage.setItem(tokenKey, jwt);
  return data.user;
}
