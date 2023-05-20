import React from "react";
import { Link } from "react-router-dom";
import img404 from "./assets/img/page404.png";

export default function page404() {
  return (
    <div
      className="container"
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <img style={{ width: "50%" }} src={img404} />
      <h4 className="text-center">
        Sorry Page Not Found <Link to="/">Go Home</Link>
      </h4>
    </div>
  );
}
