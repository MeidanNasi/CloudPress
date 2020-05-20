import React from "react";
import "./../App.css";
function Avatar({ img }) {
  return (
    <div>
      <img src={img} alt="Avatar" className="avatar" />
    </div>
  );
}

export default Avatar;
