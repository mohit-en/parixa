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

export default function QuestionsScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [questionsList, setQuestionsList] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [courseList, setCourseList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [optionsForUpdate, setOptionsForUpdate] = useState([]);

  const [formData, setFormData] = useState({
    question_text: "",
    option_1: "",
    option_2: "",
    option_3: "",
    option_4: "",
    correct_option: "",
    subject_id: 0,
    course_id: 0,
  });

  const toggle = () => {
    setModal(!modal);
    if (modal && isEdit) {
      setFormData({
        question_text: "",
        option_1: "",
        option_2: "",
        option_3: "",
        option_4: "",
        correct_option: "",
        subject_id: 0,
        course_id: 0,
      });
      setOptionsForUpdate([]);
    }
  };

  useEffect(() => {
    $(document).ready(function () {
      $("#dataTable").DataTable();
    });

    return () => {};
  }, [questionsList]);

  useEffect(() => {
    fetchingData();
    fetchingCourseList();

    return () => {};
  }, []);

  const fetchingData = async () => {
    try {
      // rest login api here

      let reqOptions = {
        url: "/api/faculty/question/fetch/",
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      };

      const { status, data } = await Axios.request(reqOptions);

      setQuestionsList(data.body);
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

  const removequestion = async (uid) => {
    try {
      let reqOptions = {
        url: `/api/faculty/question/delete/${uid}`,
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
  const editQuestion = async (uid) => {
    try {
      let reqOptions = {
        url: `/api/faculty/question/fetch/${uid}`,
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      };

      const { status, data } = await Axios.request(reqOptions);
      // console.log(data.body);

      setFormData({
        question_text: data.body.question_text,
        option_1: data.body.options[0].option_text,
        option_2: data.body.options[1].option_text,
        option_3: data.body.options[2].option_text,
        option_4: data.body.options[3].option_text,
        correct_option:
          data.body.options[
            data.body.options.findIndex((child) => child.is_answer == 1)
          ].option_text,
        subject_id: data.body.subject_id,
        course_id: data.body.course_id,
      });
      setOptionsForUpdate({
        question_id: data.body.question_id,
        options: [
          {
            option_id: data.body.options[0].option_id,
            option_text: data.body.options[0].option_text,
          },
          {
            option_id: data.body.options[1].option_id,
            option_text: data.body.options[1].option_text,
          },
          {
            option_id: data.body.options[2].option_id,
            option_text: data.body.options[2].option_text,
          },
          {
            option_id: data.body.options[3].option_id,
            option_text: data.body.options[3].option_text,
          },
        ],
      });
      // console.log("====================================");
      // console.log(formData);
      // console.log("====================================");

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

      const option = [
        formData.option_1,
        formData.option_2,
        formData.option_3,
        formData.option_4,
      ];

      let bodyContent = JSON.stringify({
        question_text: formData.question_text,
        rightAnswer: option.findIndex(
          (option) => option === formData.correct_option
        ),
        options: option,
        subject_id: formData.subject_id,
        course_id: formData.course_id,
      });
      // console.log("====================================");
      // console.log(bodyContent);
      // console.log("====================================");

      let reqOptions = {
        url: "/api/faculty/question/add",
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

        if (element == "" && element != "course_id") {
          StatusAlertService.showError(`Please Fill ${key} `);
          return;
        }
      }

      const option = [
        formData.option_1,
        formData.option_2,
        formData.option_3,
        formData.option_4,
      ];
      let bodyContent = JSON.stringify({
        question_text: formData.question_text,
        rightAnswer: option.findIndex(
          (option) => option === formData.correct_option
        ),
        options: optionsForUpdate.options,
        subject_id: formData.subject_id,
        course_id: formData.course_id,
      });

      // console.log("====================================");
      // console.log(bodyContent);
      // console.log("====================================");

      let reqOptions = {
        url: `/api/faculty/question/update/${optionsForUpdate.question_id}`,
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
                  <h4>Questions Data</h4>
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
                      <th>Questions</th>
                      <th>Subject</th>
                      <th>Course</th>
                      <th>Operation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {questionsList.map((ls, i) => {
                      return (
                        <tr key={i}>
                          <th>{i + 1}</th>
                          <th>{ls.question_text}</th>
                          <th>{ls.subject_name}</th>
                          <th>{ls.course_name}</th>
                          <th>
                            <span
                              className="btn btn-info rounded-circle mr-2"
                              onClick={() => editQuestion(ls.question_id)}
                            >
                              <FontAwesomeIcon icon={"edit"} color="#fff" />
                            </span>
                            <span
                              className="btn btn-danger rounded-circle"
                              onClick={() => removequestion(ls.question_id)}
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
                    {isEdit ? "Edit Question" : "Add New Question"}
                  </ModalHeader>
                  <ModalBody>
                    {/*  */}
                    <Form>
                      <FormGroup>
                        <Label>Enter Question</Label>
                        <Input
                          name="question_text"
                          placeholder="Enter Question"
                          type="text"
                          onChange={handleFormChange}
                          value={formData.question_text}
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
                                selected="selected"
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
                      <FormGroup>
                        <Label>Option 1</Label>
                        <Input
                          name="option_1"
                          placeholder="Enter Option 1"
                          type="text"
                          onChange={handleFormChange}
                          value={formData.option_1}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Option 2</Label>
                        <Input
                          name="option_2"
                          placeholder="Enter Option 2"
                          type="text"
                          onChange={handleFormChange}
                          value={formData.option_2}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Option 3</Label>
                        <Input
                          name="option_3"
                          placeholder="Enter Option 3"
                          type="text"
                          onChange={handleFormChange}
                          value={formData.option_3}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Option 4</Label>
                        <Input
                          name="option_4"
                          placeholder="Enter Option 4"
                          type="text"
                          onChange={handleFormChange}
                          value={formData.option_4}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Select Correct Option</Label>
                        <Input
                          type="select"
                          name="correct_option"
                          onChange={handleFormChange}
                          value={formData.correct_option}
                        >
                          <option value="">Select Correct Option</option>
                          <option key="option_1" value={formData.option_1}>
                            Option 1
                          </option>
                          <option key="option_2" value={formData.option_2}>
                            Option 2
                          </option>
                          <option key="option_3" value={formData.option_3}>
                            Option 3
                          </option>
                          <option key="option_4" value={formData.option_4}>
                            Option 4
                          </option>
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
                        Add Question
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
