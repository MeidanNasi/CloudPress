import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import Card from "../../components/card";
import { Headerback } from "../../components/svg/Headerback";
import Logo from "../../assets/wlogo.png";
import img1 from "../../assets/1.png";
import img2 from "../../assets/2.png";
import fakeUser from "../../fakeUser.json";

import "./profile.css";
import Avatar from "../../components/avatar";

const Profile = (props) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(fakeUser);
  }, []);

  const handleCreate = () => {
    // send request to server ...
    console.log("create");
  };

  const handleLogOut = () => {
    // delete jwt from localstorage..
    console.log("log-out");
  };
  const handleRemove = (id) => {
    // ask the server to remove the project with the given id..
    console.log("remove");
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
            <h1> Hello, {user.name}!</h1>
            <Avatar img={user.img} />
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
            {user.projects
              ? user.projects.map((item) => (
                  <Card
                    title={item.title}
                    url={item.url}
                    creationDate={item.creationdate}
                    remove={handleRemove(item.id)}
                  />
                ))
              : null}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
