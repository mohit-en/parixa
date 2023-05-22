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

export default function CourseScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [courseList, setCourseList] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] = useState({
    course_name: "",
  });

  //
  const toggle = () => {
    setModal(!modal);
  };

  //
  useEffect(() => {
    $(document).ready(function () {
      $("#dataTable").DataTable();
    });

    return () => {};
  }, [courseList]);

  useEffect(() => {
    fetchingData();

    return () => {};
  }, []);

  const fetchingData = async () => {
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
      setIsLoading(false);
    } catch (error) {
      console.log("====================================");
      console.log(error.response.data.msg);
      console.log("====================================");
    }
  };

  const removeCourse = async (uid) => {
    try {
      let reqOptions = {
        url: `/api/admin/course/delete/${uid}`,
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
  const editCourse = async (uid) => {
    try {
      // rest login api here

      let reqOptions = {
        url: `/api/admin/course/fetch/${uid}`,
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      };

      const { status, data } = await Axios.request(reqOptions);
      console.log(data);

      const { course_id, course_name } = data.body;

      setFormData({
        course_id,
        course_name,
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
        "Content-Type": "application/json",
      };

      for (const key in formData) {
        const element = formData[key];

        if (element == "" && element != "course_id") {
          StatusAlertService.showError(`Please Fill ${key} `);
          return;
        }
      }

      let bodyContent = JSON.stringify(formData);

      let reqOptions = {
        url: "/api/admin/course/add",
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
        "Content-Type": "application/json",
      };

      for (const key in formData) {
        const element = formData[key];

        if (element == "" && element != "course_id") {
          StatusAlertService.showError(`Please Fill ${key} `);
          return;
        }
      }

      let bodyContent = JSON.stringify(formData);

      let reqOptions = {
        url: `/api/admin/course/update/${formData.course_id}`,
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
        course_name: "",
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
                  <h4>Course Data</h4>
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
                      <th>Course Name</th>
                      <th>Operation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courseList.map((ls, i) => {
                      return (
                        <tr key={i}>
                          <th>{i + 1}</th>
                          <th>{ls.course_name}</th>
                          <th>
                            <span
                              className="btn btn-info rounded-circle mr-2"
                              onClick={() => editCourse(ls.course_id)}
                            >
                              <FontAwesomeIcon icon={"edit"} color="#fff" />
                            </span>
                            <span
                              className="btn btn-danger rounded-circle"
                              onClick={() => removeCourse(ls.course_id)}
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
                    {isEdit ? "Edit Course" : "Add New Course"}
                  </ModalHeader>
                  <ModalBody>
                    {/*  */}
                    <Form>
                      <FormGroup>
                        <Label>Name</Label>
                        <Input
                          name="course_name"
                          placeholder="Enter Course"
                          type="text"
                          onChange={handleFormChange}
                          value={formData.course_name}
                        />
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
                        Add Course
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
