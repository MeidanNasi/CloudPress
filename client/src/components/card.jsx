import React from "react";

function Card({ title, url, creationDate, remove }) {
  return (
    <React.Fragment>
      <div
        className="card"
        style={{
          width: "30vh",
          height: "15vh",
          margin: "2vh",
          boxShadow: "1vh 0.3vh 2vh 0.1vh rgba(0, 0, 0, 0.3)",
        }}
      >
        <div className="card-body">
          <h3 className="card-title" style={{ color: "black" }}>
            {title}
          </h3>
          <h6 className="card-subtitle mb-2 text-muted">{creationDate}</h6>
          <a href={url} onClick={remove} className="card-link">
            Remove
          </a>
          <a href={url} className="card-link">
            Link to site
          </a>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Card;
