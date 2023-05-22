import React, { useState } from "react";
import Axios from "axios";
import { StatusAlertService } from "react-status-alert";

import { useNavigate } from "react-router-dom";

import "./style.css";

export default function Login() {
  const [email, setEmail] = useState("admin@admin.com");
  const [password, setPassword] = useState("123456");

  //
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (email && password) {
      try {
        // const res = await Axios.post(
        //   "/api/auth/login",
        //   {
        //     email: email,
        //     password: password,
        //   },
        //   {
        //     withCredentials: true,
        //   }
        // );
        // console.log(res.data);

        var headersList = {
          Accept: "*/*",
          "Content-Type": "application/json",
        };

        var bodyContent = JSON.stringify({
          email: email,
          password: password,
        });

        var reqOptions = {
          url: "/api/auth/login",
          method: "POST",
          headers: headersList,
          data: bodyContent,
        };

        const { data, status } = await Axios.request(reqOptions);

        StatusAlertService.showSuccess(data.msg);

        switch (data.body.user_role) {
          case "admin":
            navigate("/admin", { replace: true });
            break;
          case "faculty":
            navigate("/faculty", { replace: true });
            break;
          case "student":
            navigate("/student", { replace: true });
            break;

          default:
            break;
        }
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
