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
  const [courseList, setCourseList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [sessionData, setSessionData] = useState([]);
  const [examID, setExamID] = useState(0);

  const [formData, setFormData] = useState({
    exam_date: "",
    start_time: "",
    end_time: "",
    questions_limit: 0,
    course_id: 0,
    subject_id: 0,
  });

  const toggle = () => {
    setModal(!modal);
    if (modal && isEdit) {
      setFormData({
        exam_date: "",
        start_time: "",
        end_time: "",
        questions_limit: 0,
        course_id: 0,
        subject_id: 0,
      });
    }
  };

  useEffect(() => {
    $(document).ready(function () {
      $("#dataTable").DataTable();
    });

    return () => {};
  }, [scheduleList]);

  useEffect(() => {
    fetchingData();
    fetchingCourseList();
    fetchingSessionData();

    return () => {};
  }, []);

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
        url: "/api/faculty/exam/fetch/",
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

  const fetchingCourseList = async () => {
    try {
      let reqOptions = {
        url: "/api/faculty/course/fetch/",
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      };

      const { status, data } = await Axios.request(reqOptions);

      setCourseList(data.body.course);
      setSubjectList(data.body.subjects);
    } catch (error) {
      console.log("====================================");
      console.log(error.response.data.msg);
      console.log("====================================");
    }
  };

  const removeScheduleExam = async (uid) => {
    try {
      let reqOptions = {
        url: `/api/faculty/exam/delete/${uid}`,
        method: "DELETE",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      };

      const { status, data } = await Axios.request(reqOptions);
      // console.log(data);
      StatusAlertService.showSuccess(data.msg);
      await fetchingData();
    } catch (error) {
      console.log("====================================");
      console.log(error.response.data.msg);
      console.log("====================================");
    }
  };
  const editScheduleExam = async (ls) => {
    try {
      // console.log(ls);
      setExamID(ls.exam_id);
      setFormData({
        exam_date: ls.exam_date,
        start_time: ls.start_time,
        end_time: ls.end_time,
        questions_limit: ls.questions_limit,
        course_id: ls.course_id,
        subject_id: ls.subject_id,
      });

      console.log("====================================");
      console.log(formData);
      console.log("====================================");

      setIsEdit(true);

      toggle();
    } catch (error) {
      console.log("====================================");
      console.log(error.response.data.msg);
      console.log("====================================");
    }
  };

  const handleFormChange = async (e) => {
    await setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // console.log("====================================");
    // console.log(formData);
    // console.log("====================================");
  };
  const handleFormSubmit = async (e) => {
    try {
      // console.log("====================================");
      // console.log(formData);
      // console.log(sessionData.user_id);
      // console.log("====================================");

      let headersList = {
        Accept: "*/*",
        "Content-Type": "application/json",
      };

      for (const key in formData) {
        const element = formData[key];

        if (element == "") {
          StatusAlertService.showError(`Please Fill ${key} `);
          return;
        }
      }

      let bodyContent = JSON.stringify({
        exam_date: formData.exam_date,
        start_time: formData.start_time.substring(0, 5),
        end_time: formData.end_time.substring(0, 5),
        questions_limit: formData.questions_limit,
        course_id: formData.course_id,
        subject_id: formData.subject_id,
        faculty_id: sessionData.user_id,
      });
      // console.log("====================================");
      // console.log(bodyContent);
      // console.log("====================================");

      let reqOptions = {
        url: "/api/faculty/exam/add",
        method: "POST",
        headers: headersList,
        data: bodyContent,
      };

      let response = await Axios.request(reqOptions);
      StatusAlertService.showSuccess(response.data.msg);

      toggle();

      await fetchingData();

      // console.log(response.data.msg);
    } catch (error) {
      console.log("====================================");
      console.log(error.response.data.msg);
      console.log("====================================");
    }
  };

  const handleFormUpdate = async (e) => {
    try {
      let headersList = {
        Accept: "*/*",
        "Content-Type": "application/json",
      };

      for (const key in formData) {
        const element = formData[key];

        if (element == "") {
          StatusAlertService.showError(`Please Fill ${key} `);
          return;
        }
      }

      let bodyContent = JSON.stringify({
        exam_date: formData.exam_date,
        start_time: formData.start_time.substring(0, 5),
        end_time: formData.end_time.substring(0, 5),
        questions_limit: formData.questions_limit,
        course_id: formData.course_id,
        subject_id: formData.subject_id,
      });

      // console.log("====================================");
      // console.log(bodyContent);
      // console.log("====================================");

      let reqOptions = {
        url: `/api/faculty/exam/update/${examID}`,
        method: "PATCH",
        headers: headersList,
        data: bodyContent,
      };

      let response = await Axios.request(reqOptions);
      StatusAlertService.showSuccess(response.data.msg);

      toggle();

      await fetchingData();

      // console.log(response.data.msg);
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
                  <h4>Schedules Data</h4>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setModal(true);
                      setIsEdit(false);
                    }}
                  >
                    + Add New
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
                              className="btn btn-info rounded-circle mr-2"
                              onClick={() => editScheduleExam(ls)}
                            >
                              <FontAwesomeIcon icon={"edit"} color="#fff" />
                            </span>
                            <span
                              className="btn btn-danger rounded-circle"
                              onClick={() => removeScheduleExam(ls.exam_id)}
                            >
                              <FontAwesomeIcon icon={"trash"} color="#fff" />
                            </span>
                          </th>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/*  */}
                <Modal isOpen={modal} toggle={toggle} centered>
                  <ModalHeader toggle={toggle}>
                    {isEdit ? "Edit Exam" : "Add New Exam"}
                  </ModalHeader>
                  <ModalBody>
                    {/*  */}
                    <Form>
                      <FormGroup>
                        <Label>Enter Date</Label>
                        <Input
                          name="exam_date"
                          placeholder="Enter Question"
                          type="date"
                          onChange={handleFormChange}
                          value={formData.exam_date}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Start Time</Label>
                        <Input
                          name="start_time"
                          placeholder="Enter Start Time"
                          type="time"
                          onChange={handleFormChange}
                          value={formData.start_time}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label>End Time</Label>
                        <Input
                          name="end_time"
                          placeholder="Enter End Time"
                          type="time"
                          onChange={handleFormChange}
                          value={formData.end_time}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label>Questions Limit</Label>
                        <Input
                          name="questions_limit"
                          placeholder="Enter Questions Limit"
                          type="number"
                          onChange={handleFormChange}
                          value={formData.questions_limit}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label>Course</Label>
                        <Input
                          id="exampleSelect"
                          name="course_id"
                          type="select"
                          onChange={handleFormChange}
                          value={formData.course_id}
                        >
                          <option value={""}>Select Course</option>
                          {courseList.map((item, index) => {
                            return (
                              <option
                                key={item.course_id}
                                value={item.course_id}
                              >
                                {item.course_name}
                              </option>
                            );
                          })}
                        </Input>
                      </FormGroup>
                      <FormGroup>
                        <Label>Subject</Label>
                        <Input
                          id="exampleSelect"
                          name="subject_id"
                          type="select"
                          onChange={handleFormChange}
                          value={formData.subject_id}
                        >
                          <option value={""}>Select Subject</option>
                          {subjectList
                            .filter(
                              (item, index) =>
                                formData.course_id == item.course_id
                            )
                            .map((item) => {
                              return (
                                <option
                                  key={item.subject_id}
                                  value={item.subject_id}
                                >
                                  {item.subject_name}
                                </option>
                              );
                            })}
                        </Input>
                      </FormGroup>
                    </Form>
                    {/*  */}
                  </ModalBody>
                  <ModalFooter>
                    {isEdit ? (
                      <Button color="success" onClick={handleFormUpdate}>
                        Update
                      </Button>
                    ) : (
                      <Button onClick={handleFormSubmit} color="primary">
                        Add Exam
                      </Button>
                    )}
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
