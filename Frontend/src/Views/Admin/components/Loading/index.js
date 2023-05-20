import React from "react";
import ReactLoading from "react-spinners/CircleLoader";

export default function Loading() {
  return (
    <div className="d-flex align-items-center vh-100 justify-content-center text-center font-weight-bold font-size-lg py-3">
      <ReactLoading type={"bars"} color="#6C63FF" />
    </div>
  );
}
