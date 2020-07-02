import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { trackPromise } from "react-promise-tracker";

import {
  createProject,
  getProjects,
  removeProject,
} from "../../services/projectsService";
import { logout, getCurrentUserName } from "../../services/authService";
import LoaderModal from "./../../components/loader/LoaderModal";
import ProjectCard from "./../../components/projectCard";

import "./profile.css";

const Profile = () => {
  const [user, setUser] = useState("");
  const [projects, setProjects] = useState([]);
  const [url, setUrl] = useState(null);
  const [showInputAlert, setshowInputAlert] = useState(false);
  const [showSuccessAlert, setshowSuccessAlert] = useState(false);
  const [showFailureAlert, setshowFailureAlert] = useState(false);

  useEffect(() => {
    getUserName();
    getData();
  }, []);

  const getUserName = async () => {
    const response = await getCurrentUserName();
    const name = response.split("@")[0];
    setUser(name);
  };
  const getData = async () => {
    const items = await getProjects();
    setProjects(items);
  };
  const handleCreate = () => {
    setshowInputAlert(true);
  };

  const handleLogOut = () => {
    logout();
    window.location.reload(true);
  };

  const handleRemove = async (id) => {
    const res = await trackPromise(removeProject(id));
    if (!res) {
      setshowFailureAlert(true);
      return;
    }
    const filtered = projects.filter((proj) => proj._id !== id);
    setProjects(filtered);
  };

  const handleOkClicked = async (input) => {
    setshowInputAlert(false);
    try {
      const response = await trackPromise(createProject(input));
      setUrl(response);
      getData();
      setshowSuccessAlert(true);
    } catch (error) {
      console.log(error);
      setshowFailureAlert(true);
    }
  };

  return (
    <React.Fragment>
      <div className="body">
        <div className="navbar">
          <p onClick={handleLogOut}>Logout</p>
        </div>

        <div className="create-container">
          <div className="txt-container">
            {user && <label> Hello, {user}!</label>}
            <h1>Let's create a new project</h1>
            <p>
              {" "}
              - When you click 'Create' you will be moved to wordPress platform,{" "}
            </p>
            <p>
              - Behind the sences our system will set all you need in cloud
              servers for you.
            </p>
            <p>
              - You always can remove/edit you projects, scroll down to watch
              your projects.
            </p>
            <Button
              id="createbtn"
              variant="btn btn-primary btn-lg"
              onClick={handleCreate}
            >
              Create
            </Button>
          </div>
        </div>
      </div>

      <div className="projects-section">
        <div className="projects-conatiner">
          <h1> Your Projects </h1>
          <div className="projects-cards">
            {projects
              ? projects.length
                ? projects.map((item) => (
                    <ProjectCard
                      key={item._id}
                      title={item.name}
                      url={item.ip + ":" + item.port}
                      creationDate={item.createdAt}
                      remove={() => {
                        handleRemove(item._id);
                      }}
                    />
                  ))
                : "No projects have been created yet."
              : "Loading..."}
          </div>
        </div>
      </div>

      <div className="copyrights">
        {" "}
        Copyright © 2020 CloudPress | Powered by CloudPress{" "}
      </div>

      {showInputAlert && (
        <SweetAlert
          input
          cancelBtnBsStyle="default"
          title="Name of project"
          placeHolder="Write your desired name"
          onConfirm={(input) => {
            handleOkClicked(input);
          }}
        >
          Write your desired name
        </SweetAlert>
      )}

      {showSuccessAlert && (
        <SweetAlert
          success
          title="Done!"
          onConfirm={() => setshowSuccessAlert(false)}
        >
          Please Access to: {url}
        </SweetAlert>
      )}

      {showFailureAlert && (
        <SweetAlert
          danger
          title="Something went worng"
          onConfirm={() => setshowFailureAlert(false)}
        >
          Please try again later.
        </SweetAlert>
      )}
      <LoaderModal />
    </React.Fragment>
  );
};

export default Profile;
