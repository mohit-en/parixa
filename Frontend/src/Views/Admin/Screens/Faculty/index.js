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

export default function FacultyScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [facultyList, setFacultyList] = useState([]);
  const [modal, setModal] = useState(false);
  const [courseList, setCourseList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] = useState({
    faculty_name: "",
    faculty_mobile: "",
    faculty_address: "",
    course_id: "",
    email: "",
    password: "",
    faculty_id: 0,
  });

  //
  const toggle = () => {
    setModal(!modal);
    if (modal && isEdit) {
      setFormData({
        faculty_name: "",
        faculty_mobile: "",
        faculty_address: "",
        course_id: "",
        email: "",
        password: "",
        faculty_id: 0,
      });
    }
  };

  //
  useEffect(() => {
    $(document).ready(function () {
      $("#dataTable").DataTable();
    });

    return () => {};
  }, [facultyList]);

  useEffect(() => {
    fetchingData();
    fetchingCourseList();

    return () => {};
  }, []);

  const fetchingData = async () => {
    try {
      let reqOptions = {
        url: "/api/admin/faculty/fetch",
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      };

      const { status, data } = await Axios.request(reqOptions);

      setFacultyList(data.body);
      setIsLoading(false);
    } catch (error) {
      console.log("====================================");
      console.log(error.response.data.msg);
      console.log("====================================");
    }
  };

  const removeFaculty = async (uid) => {
    try {
      // rest login api here

      let reqOptions = {
        url: `/api/admin/faculty/delete/${uid}`,
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
  const editFaculty = async (uid) => {
    try {
      // rest login api here

      let reqOptions = {
        url: `/api/admin/faculty/fetch/${uid}`,
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      };

      const { status, data } = await Axios.request(reqOptions);
      // console.log(data);

      const {
        faculty_id,
        faculty_name,
        faculty_mobile,
        faculty_address,
        course_id,
        user_email,
        user_password,
      } = data.body;
      console.log(data.body);

      setFormData({
        faculty_id,
        faculty_name,
        faculty_mobile,
        faculty_address,
        course_id,
        email: user_email,
        password: user_password,
      });

      console.log("ee====================================");
      console.log(formData);
      console.log("ee====================================");

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

        if (element == "" && key != "faculty_id") {
          StatusAlertService.showError(`Please Fill ${key} `);
          return;
        }
      }
      console.log(formData);

      let bodyContent = JSON.stringify(formData);

      let reqOptions = {
        url: "/api/admin/faculty/add",
        method: "POST",
        headers: headersList,
        data: bodyContent,
      };

      let response = await Axios.request(reqOptions);
      StatusAlertService.showSuccess(response.data.msg);

      toggle();

      await fetchingData();
      setFormData({
        faculty_name: "",
        faculty_mobile: "",
        faculty_address: "",
        course_id: "",
        email: "",
        password: "",
      });

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

        if (element == "" && key != "faculty_id") {
          StatusAlertService.showError(`Please Fill ${key} `);
          return;
        }
      }
      const { faculty_name, faculty_mobile, faculty_address, course_id } =
        formData;
      let bodyContent = JSON.stringify({
        faculty_name,
        faculty_mobile,
        faculty_address,
        course_id,
      });

      // console.log(bodyContent);
      console.log(formData);

      let reqOptions = {
        url: `/api/admin/faculty/update/${formData.faculty_id}`,
        method: "PATCH",
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
                  <h4>Faculty Data</h4>
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
                      <th>Faculty Name</th>
                      <th>Mobile No</th>
                      <th>Operation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {facultyList.map((ls, i) => {
                      return (
                        <tr key={i}>
                          <th>{i + 1}</th>
                          <th>{ls.faculty_name}</th>
                          <th>{ls.faculty_mobile}</th>
                          <th>
                            <span
                              className="btn btn-info rounded-circle mr-2"
                              onClick={() => editFaculty(ls.faculty_id)}
                            >
                              <FontAwesomeIcon icon={"edit"} color="#fff" />
                            </span>
                            <span
                              className="btn btn-danger rounded-circle"
                              onClick={() => removeFaculty(ls.faculty_id)}
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
                    {isEdit ? "Edit Faculty" : "Add New Faculty"}
                  </ModalHeader>
                  <ModalBody>
                    {/*  */}
                    <Form>
                      <FormGroup>
                        <Label>Name</Label>
                        <Input
                          name="faculty_name"
                          placeholder="Enter Faculty Name"
                          type="text"
                          onChange={handleFormChange}
                          value={formData.faculty_name}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Moblie No</Label>
                        <Input
                          name="faculty_mobile"
                          placeholder="Enter Moblie No"
                          type="text"
                          onChange={handleFormChange}
                          value={formData.faculty_mobile}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Address</Label>
                        <Input
                          name="faculty_address"
                          placeholder="Enter Address"
                          type="text"
                          onChange={handleFormChange}
                          value={formData.faculty_address}
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
                            placeholder="Enter Faculty Password"
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
                        Add Faculty
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
