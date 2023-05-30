import "./assets/css/font.css";
import "./assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "./assets/css/variables.css";
import "./assets/css/main.css";
import Axios from "axios";
import "./assets/js/main.js";
import img1 from "./assets/img/hero-carousel/hero-carousel-3.svg";

import { Link } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  var [isLogged, setisLogged] = useState(false);
  const [userRole, setUserRole] = useState("");

  const handleIsUserAldradyLogin = async () => {
    try {
      const res = await Axios.post("api/auth/isUserLogin", {});
      console.log(res.data.body.isUserLogin);
      if (res.data.body.isUserLogin) {
        setisLogged(true);
        let reqOptions = {
          url: "api/auth/session",
          method: "POST",
        };
        let response = await Axios.request(reqOptions);
        setUserRole(response.data.body.user_role);
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  handleIsUserAldradyLogin();

  return (
    <div>
      {/* ======= Header ======= */}
      <header id="header" className="header fixed-top" data-scrollto-offset={0}>
        <div className="container-fluid d-flex align-items-center justify-content-between">
          <a
            href="/"
            className="logo d-flex align-items-center scrollto me-auto me-lg-0"
          >
            <h1>
              Parixa<span>.</span>
            </h1>
          </a>
          {/* .navbar */}

          <Link to={isLogged == "" ? "/login" : `/${userRole}`}>
            <button className="btn-getstarted scrollto">
              {isLogged ? "Dashboard" : "Login"}
            </button>
          </Link>
        </div>
      </header>
      {/* End Header */}
      <section
        id="hero-animated"
        className="hero-animated d-flex align-items-center"
      >
        <div
          className="container d-flex flex-column justify-content-center align-items-center text-center position-relative"
          data-aos="zoom-out"
        >
          <img src={img1} className="img-fluid animated" />
          <h2>
            Welcome to <span>Parixa</span>
          </h2>
          <p>
            Ready to be challenged? 🤔💡 Our quiz app will put your knowledge to
            the test and help you learn something new along the way! 📚🌟
          </p>
          <div className="d-flex">
            <button className="btn-get-started scrollto">Get Started</button>
          </div>
        </div>
      </section>

      {/* ======= Footer ======= */}
      <footer id="footer" className="footer">
        <div className="footer-legal text-center">
          <div className="container d-flex flex-column flex-lg-row justify-content-center justify-content-lg-between align-items-center">
            <div className="d-flex flex-column align-items-center align-items-lg-start">
              <div className="copyright">
                © Copyright{" "}
                <strong>
                  <span>Mohit Mistry</span>
                </strong>
                . All Rights Reserved
              </div>
            </div>
            <div className="social-links order-first order-lg-last mb-3 mb-lg-0">
              <a href="/" className="instagram">
                <i className="bi bi-instagram" />
              </a>
              <a href="/" className="linkedin">
                <i className="bi bi-linkedin" />
              </a>
            </div>
          </div>
        </div>
      </footer>
      {/* End Footer */}
      <a
        href="/"
        className="scroll-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short" />
      </a>
    </div>
  );
}
