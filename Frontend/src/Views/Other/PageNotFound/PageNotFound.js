import React from "react";
import { Link } from "react-router-dom";
import img404 from "./assets/img/page404.png";

export default function page404() {
  return (
    <div className="container">
      <img style={{ width: "97%" }} src={img404} />
      <h4 className="text-center">
        Sorry Page Not Found <Link to="/">Go Home</Link>
      </h4>
    </div>
  );
}
