import React, { Fragment, useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Row,
  Col,
  CardBody,
  Card,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Form,
  FormGroup,
  FormControl,
  Label,
  Input,
  FormText,
} from "reactstrap";
import Axios, { formToJSON } from "axios";
import ReactLoading from "react-spinners/CircleLoader";
import { StatusAlertService } from "react-status-alert";
import { Link } from "react-router-dom";

// data table
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import "jquery/dist/jquery.min.js";

export default function ScheduleExamScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [scheduleList, setScheduleList] = useState([]);
  const [sessionData, setSessionData] = useState([]);
  // const [timeCounting, setTimeCounting] = useState(0);
  const [currentTime, setCurrentTime] = useState("");
  const [remainingTime, setRemainingTime] = useState(0);
  const [isExamEnded, setIsExamEnded] = useState(false);

  const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      const tick = () => {
        savedCallback.current();
      };

      if (delay !== null) {
        const intervalId = setInterval(tick, delay);
        return () => clearInterval(intervalId);
      }
    }, [delay]);
  };
  useInterval(() => {
    const now = new Date();
    const formattedTime = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    setCurrentTime(formattedTime);
  }, 1000);

  useEffect(() => {
    $(document).ready(function () {
      $("#dataTable").DataTable();
    });

    return () => {};
  }, [scheduleList]);

  useEffect(() => {
    fetchingData();
    // fetchingSessionData();

    return () => {};
  }, [currentTime]);

  const fetchingSessionData = async () => {
    try {
      // rest login api here
      let headersList = {
        Accept: "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      };
      let reqOptions = {
        url: "/api/auth/session",
        method: "POST",
        headers: headersList,
      };

      const { status, data } = await Axios.request(reqOptions);
      setSessionData(data.body);
    } catch (error) {
      console.log("====================================");
      console.log(error.response.data.msg);
      console.log("====================================");
    }
  };
  const fetchingData = async () => {
    try {
      // rest login api here

      let reqOptions = {
        url: "/api/student/todayexam/fetch/",
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      };

      const { status, data } = await Axios.request(reqOptions);

      setScheduleList(data.body);
      setIsLoading(false);
    } catch (error) {
      console.log("====================================");
      console.log(error.response.data.msg);
      console.log("====================================");
    }
  };

  return (
    <Fragment>
      <Row>
        <Card className="card-box border-0 text-light mb-5">
          <CardBody>
            {isLoading ? (
              <div className="d-flex align-items-center vh-100 justify-content-center text-center font-weight-bold font-size-lg py-3">
                <ReactLoading type={"bars"} color="#6C63FF" />
              </div>
            ) : (
              <div>
                <div className="w-100 d-flex justify-content-between align-items-center my-2 text-dark">
                  <h4>Today's Exam</h4>
                </div>
                <table
                  className="table table-bordered text-center"
                  id="dataTable"
                  cellSpacing={10}
                  style={{ borderColor: "#B4B4B4", width: "99%" }}
                >
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Subject</th>
                      <th>Date</th>
                      <th>Strat | End time</th>
                      <th>Faculty</th>
                      <th>Join Exam</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scheduleList.map((ls, i) => {
                      const examStartTime = `${ls.exam_date} ${ls.start_time}`;
                      const examEndTime = `${ls.exam_date} ${ls.end_time}`;

                      const remainingSeconds = Math.floor(
                        (new Date(examStartTime) - new Date()) / 1000
                      );
                      const isExamEnded = new Date() > new Date(examEndTime);

                      const hours = Math.floor(remainingSeconds / 3600);
                      const minutes = Math.floor(
                        (remainingSeconds % 3600) / 60
                      );
                      const seconds = remainingSeconds % 60;

                      const formattedTime = `${hours
                        .toString()
                        .padStart(2, "0")}:${minutes
                        .toString()
                        .padStart(2, "0")}:${seconds
                        .toString()
                        .padStart(2, "0")}`;

                      return (
                        <tr key={i}>
                          <th>{i + 1}</th>
                          <th>{ls.subject_name}</th>
                          <th>{ls.exam_date}</th>
                          <th>
                            {ls.start_time} | {ls.end_time}
                          </th>
                          <th>{ls.faculty_name}</th>
                          <th>
                            {currentTime >= ls.start_time &&
                            currentTime <= ls.end_time ? (
                              <Link
                                className={`btn btn-primary ${
                                  isExamEnded ? "disabled" : ""
                                }`}
                                to={`/liveexam/${ls.exam_id}`}
                                target="_blank"
                                disabled={isExamEnded}
                              >
                                Join
                              </Link>
                            ) : currentTime > ls.end_time ? (
                              ""
                            ) : (
                              <span>{formattedTime} remaining</span>
                            )}
                          </th>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardBody>
        </Card>
      </Row>
    </Fragment>
  );
}
