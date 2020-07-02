import httpService from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/projects";

// creating new project
export async function createProject(projName) {
  const token = localStorage.getItem("token");
  try {
    const res = await httpService.post(
      apiEndpoint,
      { name: projName },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data.ip + ":" + res.data.port;
  } catch (error) {
    console.log(error);
  }
}
// getting all projects
export async function getProjects() {
  const token = localStorage.getItem("token");
  try {
    const response = await httpService.get(apiEndpoint, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
// removing project by given id
export async function removeProject(id) {
  const token = localStorage.getItem("token");
  try {
    const res = await httpService.delete(apiEndpoint + "/" + id, {
      headers: { Authorization: `Bearer ${token}` },
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
