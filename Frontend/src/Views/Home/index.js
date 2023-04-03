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

  const handleIsUserAldradyLogin = async () => {
    try {
      const res = await Axios.post(
        "http://127.0.0.1:8000/api/auth/isUserLogin"
      );
      // console.log(res.data.body.isUserLogin);
      if (res.data.body.isUserLogin) {
        setisLogged(true);
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

          <Link to={"/login"}>
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
            <a
              href="https://www.youtube.com/watch?v=LXb3EKWsInQ"
              className="glightbox btn-watch-video d-flex align-items-center"
            >
              <i className="bi bi-play-circle" />
              <span>Watch Video</span>
            </a>
          </div>
        </div>
      </section>
      <main id="main">
        {/* ======= Featured Services Section ======= */}
        <section id="featured-services" className="featured-services">
          <div className="container">
            <div className="row gy-4">
              <div className="col-xl-3 col-md-6 d-flex" data-aos="zoom-out">
                <div className="service-item position-relative">
                  <div className="icon">
                    <i className="bi bi-activity icon" />
                  </div>
                  <h4>
                    <a href className="stretched-link">
                      Batter Performance
                    </a>
                  </h4>
                  <p>
                    With the use of this app you can Visulize in batter way of
                    your performance and track your marks.
                  </p>
                </div>
              </div>
              {/* End Service Item */}
              <div
                className="col-xl-3 col-md-6 d-flex"
                data-aos="zoom-out"
                data-aos-delay={200}
              >
                <div className="service-item position-relative">
                  <div className="icon">
                    <i className="bi bi-bounding-box-circles icon" />
                  </div>
                  <h4>
                    <a href className="stretched-link">
                      Sed ut perspici
                    </a>
                  </h4>
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore
                  </p>
                </div>
              </div>
              {/* End Service Item */}
              <div
                className="col-xl-3 col-md-6 d-flex"
                data-aos="zoom-out"
                data-aos-delay={400}
              >
                <div className="service-item position-relative">
                  <div className="icon">
                    <i className="bi bi-calendar4-week icon" />
                  </div>
                  <h4>
                    <a href className="stretched-link">
                      Magni Dolores
                    </a>
                  </h4>
                  <p>
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia
                  </p>
                </div>
              </div>
              {/* End Service Item */}
              <div
                className="col-xl-3 col-md-6 d-flex"
                data-aos="zoom-out"
                data-aos-delay={600}
              >
                <div className="service-item position-relative">
                  <div className="icon">
                    <i className="bi bi-broadcast icon" />
                  </div>
                  <h4>
                    <a href className="stretched-link">
                      Nemo Enim
                    </a>
                  </h4>
                  <p>
                    At vero eos et accusamus et iusto odio dignissimos ducimus
                    qui blanditiis
                  </p>
                </div>
              </div>
              {/* End Service Item */}
            </div>
          </div>
        </section>
        {/* End Featured Services Section */}
      </main>
      {/* End #main */}
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
