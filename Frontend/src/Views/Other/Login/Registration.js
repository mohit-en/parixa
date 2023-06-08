import React, { useState, useEffect } from "react";
import Axios from "axios";
import { StatusAlertService } from "react-status-alert";

import { useNavigate } from "react-router-dom";

import "./style.css";

export default function Registration() {
  const [email, setEmail] = useState("admin@admin.com");
  const [password, setPassword] = useState("123456");
  const [role, setRole] = useState("");
  const [course, setCourse] = useState("");
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [courseList, setCourseList] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (email && password && role != "" && course != "") {
      // console.log(`${email} | ${password} | ${role} | ${course}`);
      var headersList = {
        Accept: "*/*",
        "Content-Type": "application/json",
      };

      var bodyContent = JSON.stringify({
        user_email: email,
        user_password: password,
        course_id: course,
        user_role: role,
        user_name: name,
        user_moblie_number: mobileNumber,
        user_address: address,
      });

      var reqOptions = {
        url: "/api/auth/register",
        method: "POST",
        headers: headersList,
        data: bodyContent,
      };

      const { data, status } = await Axios.request(reqOptions);

      StatusAlertService.showSuccess(data.msg);
    } else {
      StatusAlertService.showInfo("Please Fill All values");
    }
  };
  useEffect(() => {
    fetchingCourseList();
  }, []);

  const fetchingCourseList = async () => {
    try {
      // rest login api here

      let reqOptions = {
        url: "/api/course/fetch/",
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      };

      const { status, data } = await Axios.request(reqOptions);

      setCourseList(data.body);
    } catch (error) {
      console.log("====================================");
      console.log(error.response.data.msg);
      console.log("====================================");
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
              </div>
              <div className="form-outline mb-4">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </div>

              <div className="form-outline mb-4">
                <input
                  type="tel"
                  id="form3Example2"
                  className="form-control form-control-lg"
                  placeholder="Enter your mobile number"
                  value={mobileNumber}
                  onChange={(event) => {
                    setMobileNumber(event.target.value);
                  }}
                />
              </div>

              <div className="form-outline mb-4">
                <textarea
                  className="form-control form-control-lg"
                  id="form3Example5"
                  rows="4"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(event) => {
                    setAddress(event.target.value);
                  }}
                ></textarea>
              </div>
              <div className="form-outline mb-3">
                <select
                  className="form-select"
                  name="role"
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                >
                  <option value="">Select Role</option>
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                </select>
              </div>
              <div className="form-outline mb-3">
                <select
                  className="form-select"
                  name="course"
                  value={course}
                  onChange={(event) => setCourse(event.target.value)}
                >
                  <option value={""}>Select Course</option>
                  {courseList.map((item, index) => {
                    return (
                      <option key={item.course_id} value={item.course_id}>
                        {item.course_name}
                      </option>
                    );
                  })}
                </select>
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
                  Request to Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
