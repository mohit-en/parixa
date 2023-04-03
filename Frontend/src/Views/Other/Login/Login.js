import React, { useState } from "react";
import Axios from "axios";
import { StatusAlertService } from "react-status-alert";

import "./style.css";

export default function Login() {
  const [email, setEmail] = useState("default@gmail.com");
  const [password, setPassword] = useState("1234");

  const handleSubmit = async () => {
    if (email && password) {
      try {
        const res = await Axios.post("http://127.0.0.1:8000/api/auth/login", {
          email: email,
          password: password,
        });
        console.log(res.data);
      } catch (err) {
        StatusAlertService.showError(err.response.data.msg);
        console.log(err.response.data);
      }
    }
  };

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample image"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form>
              {/* Email input */}
              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="form3Example3"
                  className="form-control form-control-lg"
                  placeholder="Enter a valid email address"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
                <label className="form-label" htmlFor="form3Example3">
                  Email address
                </label>
              </div>
              {/* Password input */}
              <div className="form-outline mb-3">
                <input
                  type="password"
                  id="form3Example4"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
                <label className="form-label" htmlFor="form3Example4">
                  Password
                </label>
              </div>
              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
