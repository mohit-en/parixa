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
import Axios from "axios";
import ReactLoading from "react-spinners/CircleLoader";
import { StatusAlertService } from "react-status-alert";

// data table
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import "jquery/dist/jquery.min.js";

export default function StudentsScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [studentsList, setStudentsList] = useState([]);
  const [modal, setModal] = useState(false);
  const [courseList, setCourseList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] = useState({
    student_name: "",
    student_mobile: "",
    student_address: "",
    course_id: "",
    email: "",
    password: "",
    student_id: 0,
  });

  //
  const toggle = () => {
    setModal(!modal);
    if (modal && isEdit) {
      setFormData({
        student_name: "",
        student_mobile: "",
        student_address: "",
        course_id: "",
        email: "",
        password: "",
        student_id: 0,
      });
    }
  };

  //
  useEffect(() => {
    $(document).ready(function () {
      $("#dataTable").DataTable();
    });

    return () => {};
  }, [studentsList]);

  useEffect(() => {
    fetchingData();
    fetchingCourseList();

    return () => {};
  }, []);

  const fetchingData = async () => {
    try {
      // rest login api here

      let reqOptions = {
        url: "/api/admin/student/fetch",
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      };

      const { status, data } = await Axios.request(reqOptions);

      setStudentsList(data.body);
      setIsLoading(false);
    } catch (error) {
      console.log("====================================");
      console.log(error.response.data.msg);
      console.log("====================================");
    }
  };

  const blockApproval = async (uid) => {
    try {
      // rest login api here

      let reqOptions = {
        url: "/api/admin/userslist/update",
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          uid: uid,
        }),
      };

      const { status, data } = await Axios.request(reqOptions);
      console.log(data);

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const removeStudent = async (uid) => {
    try {
      // rest login api here

      let reqOptions = {
        url: `/api/admin/student/delete/${uid}`,
        method: "DELETE",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      };

      const { status, data } = await Axios.request(reqOptions);
      console.log(data);
      StatusAlertService.showSuccess(data.msg);
      await fetchingData();
    } catch (error) {
      console.log("====================================");
      console.log(error.response.data.msg);
      console.log("====================================");
    }
  };
  const editStudent = async (uid) => {
    try {
      // rest login api here

      let reqOptions = {
        url: `/api/admin/student/fetch/${uid}`,
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      };

      const { status, data } = await Axios.request(reqOptions);
      console.log(data);

      const {
        student_name,
        student_mobile,
        student_address,
        course_id,
        user_email,
        user_password,
      } = data.body;

      setFormData({
        student_name,
        student_mobile,
        student_address,
        course_id,
        email: user_email,
        password: user_password,
        student_id: uid,
      });

      setIsEdit(true);

      toggle();

      // StatusAlertService.showSuccess(data.msg);
      // await fetchingData();
    } catch (error) {
      console.log("====================================");
      console.log(error.response.data.msg);
      console.log("====================================");
    }
  };

  const fetchingCourseList = async () => {
    try {
      // rest login api here

      let reqOptions = {
        url: "/api/admin/course/fetch/",
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

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // console.log("====================================");
    // console.log(formData);
    // console.log("====================================");
  };
  const handleFormSubmit = async (e) => {
    try {
      let headersList = {
        Accept: "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json",
      };

      for (const key in formData) {
        const element = formData[key];

        if (key != "student_id" && element == "") {
          StatusAlertService.showError(`Please Fill ${key} `);
          return;
        }
      }

      let bodyContent = JSON.stringify(formData);

      let reqOptions = {
        url: "/api/admin/student/add",
        method: "POST",
        headers: headersList,
        data: bodyContent,
      };

      let response = await Axios.request(reqOptions);
      StatusAlertService.showSuccess(response.data.msg);

      toggle();

      await fetchingData();

      console.log(response.data.msg);
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
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json",
      };

      for (const key in formData) {
        const element = formData[key];

        if (element == "" && element != "student_id") {
          StatusAlertService.showError(`Please Fill ${key} `);
          return;
        }
      }

      let bodyContent = JSON.stringify(formData);

      let reqOptions = {
        url: `/api/admin/student/update/${formData.student_id}`,
        method: "PATCH",
        headers: headersList,
        data: bodyContent,
      };

      let response = await Axios.request(reqOptions);
      StatusAlertService.showSuccess(response.data.msg);

      toggle();

      await fetchingData();

      console.log(response.data.msg);

      setFormData({
        course_id: "",
        email: "",
        password: "",
        student_address: "",
        student_id: "",
        student_mobile: "",
        student_name: "",
      });
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
                  <h4>Students Data</h4>
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
                      <th>User Name</th>
                      <th>Mobile No</th>
                      <th>Operation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentsList.map((ls, i) => {
                      return (
                        <tr key={i}>
                          <th>{i + 1}</th>
                          <th>{ls.student_name}</th>
                          <th>{ls.student_mobile}</th>
                          <th>
                            <span
                              className="btn btn-info rounded-circle mr-2"
                              onClick={() => editStudent(ls.student_id)}
                            >
                              <FontAwesomeIcon icon={"edit"} color="#fff" />
                            </span>
                            <span
                              className="btn btn-danger rounded-circle"
                              onClick={() => removeStudent(ls.student_id)}
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
                    {isEdit ? "Edit Student" : "Add New Student"}
                  </ModalHeader>
                  <ModalBody>
                    {/*  */}
                    <Form>
                      <FormGroup>
                        <Label>Name</Label>
                        <Input
                          name="student_name"
                          placeholder="Enter Name"
                          type="text"
                          onChange={handleFormChange}
                          value={formData.student_name}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Moblie No</Label>
                        <Input
                          name="student_mobile"
                          placeholder="Enter Moblie No"
                          type="text"
                          onChange={handleFormChange}
                          value={formData.student_mobile}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Address</Label>
                        <Input
                          name="student_address"
                          placeholder="Enter Address"
                          type="text"
                          onChange={handleFormChange}
                          value={formData.student_address}
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
                          <option value={""}>Select Option</option>
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
                        <Label>Email</Label>
                        <Input
                          name="email"
                          placeholder="Enter Email"
                          type="text"
                          onChange={handleFormChange}
                          value={formData.email}
                          disabled={isEdit}
                        />
                      </FormGroup>
                      {!isEdit ? (
                        <FormGroup>
                          <Label>Passowrd</Label>
                          <Input
                            name="password"
                            placeholder="Enter Student Password"
                            type="password"
                            onChange={handleFormChange}
                            value={formData.password}
                          />
                        </FormGroup>
                      ) : null}
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
                        Add Student
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
