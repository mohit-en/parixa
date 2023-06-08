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
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import moment from "moment";

// data table
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import "jquery/dist/jquery.min.js";

export default function DoneExamScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [scheduleList, setScheduleList] = useState([]);
  const [sessionData, setSessionData] = useState([]);
  const [timeCounting, setTimeCounting] = useState(0);
  const [modal, setModal] = useState(false);

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
  }, []);
  const toggle = () => {
    setModal(!modal);
  };

  const fetchingData = async () => {
    try {
      // rest login api here

      let reqOptions = {
        url: "/api/student/doneexam/fetch/",
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
                  <h4>Done Exam</h4>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setModal(true);
                    }}
                  >
                    + See Growth
                  </button>
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
                      <th>marks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scheduleList.map((ls, i) => {
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
                            <i>
                              {ls.marks_obtained} out of {ls.questions_limit}
                            </i>
                          </th>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <Modal isOpen={modal} toggle={toggle} centered>
                  <ModalHeader toggle={toggle}>
                    {"Growth of student"}
                  </ModalHeader>
                  <ModalBody>
                    {/*  */}
                    <Form>
                      <FormGroup>
                        {scheduleList ? (
                          <Line
                            data={{
                              labels: scheduleList.map(
                                (label) =>
                                  `${moment(label.exam_date).format(
                                    "MMM DD"
                                  )}(${label.questions_limit})`
                              ),
                              datasets: [
                                {
                                  label: "Marks 2023",
                                  data: scheduleList.map(
                                    (item) => item.marks_obtained
                                  ),
                                  fill: false,
                                  backgroundColor: "#6C63FF",
                                  borderColor: "#6C63FF",
                                },
                              ],
                            }}
                            options={{
                              responsive: true,
                              maintainAspectRatio: false,
                              scales: {
                                xAxes: [
                                  {
                                    ticks: {
                                      autoSkip: true,
                                      maxTicksLimit: 10,
                                    },
                                  },
                                ],
                              },
                            }}
                          />
                        ) : (
                          <div className="d-flex align-items-center justify-content-center">
                            <ReactLoading type={"bars"} color="#6C63FF" />
                          </div>
                        )}
                      </FormGroup>
                    </Form>
                    {/*  */}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onClick={toggle}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>
              </div>
            )}
          </CardBody>
        </Card>
      </Row>
    </Fragment>
  );
}
