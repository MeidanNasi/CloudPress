import React, { useEffect, useState } from "react";

import { Button, ProgressBar } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";

import { Headerback } from "../../components/svg/Headerback";
import Card from "../../components/card";

import Logo from "../../assets/wlogo.png";
import img1 from "../../assets/1.png";
import img2 from "../../assets/2.png";

import {
  createProject,
  getProjects,
  removeProject,
} from "../../services/projectsService";
import { logout, getCurrentUserName } from "../../services/authService";

import "./profile.css";

const Profile = (props) => {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState(null);
  const [url, setUrl] = useState(null);
  const [showInputAlert, setshowInputAlert] = useState(false);
  const [showSuccessAlert, setshowSuccessAlert] = useState(false);
  const [showFailureAlert, setshowFailureAlert] = useState(false);
  const [showLoadingAlert, setshowLoadingAlert] = useState(false);
  const [progressTime, setProgressTime] = useState(0);

  useEffect(() => {
    getUserName();
    getData();
  }, []);

  const getUserName = async () => {
    const { data } = await getCurrentUserName();
    data ? setUser(data.email) : setUser(null);
  };
  const getData = async () => {
    const items = await getProjects();
    items ? setProjects(items.data) : setProjects([]);
  };
  const handleCreate = () => {
    setshowInputAlert(true);
  };

  const handleLogOut = () => {
    logout();
    window.location.reload(true);
  };
  const handleRemove = async (id) => {
    const res = await removeProject(id);
    if (!res) {
      setshowFailureAlert(true);
      return;
    }
    const filtered = projects.filter((proj) => proj._id != id);
    setProjects(filtered);
  };
  const handleOkClicked = async (input) => {
    setshowInputAlert(false);
    try {
      const res = await createProject(input); // creating project with given name.
      setUrl(res);
      res ? setshowSuccessAlert(true) : setshowFailureAlert(true);
    } catch (error) {
      console.log(error);
      showFailureAlert(true);
    }
  };
  const progress = () => {
    setshowLoadingAlert(true);
    const interval = setInterval(() => {
      setProgressTime((prevState) => prevState + 1);
      if (progressTime >= 100) clearInterval(interval);
    }, 1000);
    interval();
    setshowLoadingAlert(false);
    setshowSuccessAlert(true);
  };
  return (
    <React.Fragment>
      <div className="body">
        <header>
          <div className="navbar">
            <img src={Logo} alt="wlogo" id="wlogo" />
            <p onClick={handleLogOut}>Logout</p>
          </div>
          <div className="header-content">
            {user ? <h1> Hello, {user}!</h1> : null}
          </div>
          <Headerback />
        </header>

        <div className="create-container">
          <div className="txt-container">
            <h1>Create new project</h1>
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
          <img src={img1} alt={img1} id="img1" />
        </div>
      </div>

      <div className="projects-section">
        <img src={img2} alt={img2} id="img2" />
        <div className="projects-conatiner">
          <h1> My Projects </h1>
          <div className="projects-cards">
            {projects
              ? projects.map((item) => (
                  <Card
                    key={item._id}
                    title={item.name}
                    url={item.ip + ":" + item.port}
                    creationDate={item.createdAt}
                    remove={() => {
                      handleRemove(item._id);
                    }}
                  />
                ))
              : "Loading..."}
          </div>
        </div>
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
      {showLoadingAlert && (
        <SweetAlert title={"Loading..."}>
          <ProgressBar animated variant="success" now={progressTime} />
        </SweetAlert>
      )}
    </React.Fragment>
  );
};

export default Profile;
