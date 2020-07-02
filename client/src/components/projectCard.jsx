import React from "react";
import { Card, Button } from "react-bootstrap";
import CloudImg from "../assets/cloud.png";
function ProjectCard({ title, url, creationDate, remove }) {
  return (
    <React.Fragment>
      <Card
        style={{
          width: "20rem",
          borderRadius: "5vh",
          margin: "2vh",
          boxShadow: "1vh 0.3vh 2vh 0.1vh rgba(0, 0, 0, 0.3)",
        }}
      >
        <Card.Img
          variant="top"
          src={CloudImg}
          style={{ padding: "2vh", size: "100%" }}
        />
        <Card.Body>
          <Card.Title style={{ color: "black" }}> {title}</Card.Title>
          <Card.Text style={{ color: "black" }}>{creationDate}</Card.Text>
          <Button
            onClick={() => {
              console.log(url);
              window.open("http://" + url + "/wp-admin", "_blank").focus();
            }}
            variant="primary"
          >
            Go
          </Button>
          <Button onClick={remove} style={{ margin: "1vh" }} variant="primary">
            Remove
          </Button>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
}

export default ProjectCard;
