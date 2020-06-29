import httpService from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/projects";
const authHeader = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};

// creating new project
export async function createProject(projName) {
  try {
    const res = await httpService.post(
      apiEndpoint,
      { name: projName },
      { headers: authHeader }
    );
    return res.data.ip + ":" + res.data.port;
  } catch (error) {
    console.log(error);
  }
}
// getting all projects
export async function getProjects() {
  try {
    const res = await httpService.get(apiEndpoint, { headers: authHeader });
    return res;
  } catch (error) {
    console.log(error);
  }
}
// removing project by given id
export async function removeProject(id) {
  try {
    const res = await httpService.delete(apiEndpoint + "/" + id, {
      headers: authHeader,
    });
    console.log("deleted", res);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export default {
  createProject,
  removeProject,
  getProjects,
};
