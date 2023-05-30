import React, { Fragment, useEffect, useState } from "react";
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

// data table
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import "jquery/dist/jquery.min.js";

export default function ScheduleExamScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [scheduleList, setScheduleList] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [resultsData, setResultsData] = useState({
    exam: {},
    studentsResult: [],
  });

  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    $(document).ready(function () {
      $("#dataTable").DataTable();
    });

    return () => {};
  }, [scheduleList]);

  useEffect(() => {
    fetchingData();

    return () => {};
  }, []);

  const fetchingData = async () => {
    try {
      // rest login api here

      let reqOptions = {
        url: "/api/faculty/doneexam/fetch/",
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

  const fetchExamData = async (id) => {
    //

    try {
      // rest login api here

      let reqOptions = {
        url: `/api/faculty/exammarks/fetch/${id}`,
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      };

      const { status, data } = await Axios.request(reqOptions);

      setResultsData(data.body);

      toggle();
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
                  <h4>Exam Done</h4>
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
                      <th>Course</th>
                      <th>Faculty</th>
                      <th>Operation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scheduleList.map((ls, i) => {
                      return (
                        <tr key={i}>
                          <th>{i + 1}</th>
                          <th>{ls.subject_name}</th>
                          <th>{ls.exam_date}</th>
                          <th>{ls.course_name}</th>
                          <th>{ls.faculty_name}</th>
                          <th>
                            <span
                              className="btn btn-primary rounded-circle"
                              onClick={() => fetchExamData(ls.exam_id)}
                            >
                              <FontAwesomeIcon icon={"eye"} color="#fff" />
                            </span>
                          </th>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/*  */}
                <Modal isOpen={modal} toggle={toggle} centered>
                  <ModalHeader toggle={toggle}>Result Report</ModalHeader>
                  <ModalBody>
                    {/*  */}

                    <table
                      className="table table-bordered text-center"
                      id="dataTable"
                      cellSpacing={10}
                      style={{ borderColor: "#B4B4B4", width: "99%" }}
                    >
                      <thead>
                        <tr>
                          <th>Date </th>
                          <th>Start Time </th>
                          <th>Total Questions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{resultsData.exam.exam_date}</td>
                          <td>{resultsData.exam.start_time}</td>
                          <td>{resultsData.exam.questions_limit}</td>
                        </tr>
                      </tbody>
                    </table>

                    <table
                      className="table table-bordered text-center"
                      id="dataTable"
                      cellSpacing={10}
                      style={{ borderColor: "#B4B4B4", width: "99%" }}
                    >
                      <thead>
                        <tr>
                          <th>No </th>
                          <th>Name </th>
                          <th>Marks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {resultsData.studentsResult.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.student_name}</td>
                              <td>{item.marks_obtained}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>

                    {/*  */}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onClick={toggle}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>
                {/*  */}
              </div>
            )}
          </CardBody>
        </Card>
      </Row>
    </Fragment>
  );
}
