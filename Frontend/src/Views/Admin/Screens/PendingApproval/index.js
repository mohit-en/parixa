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

export default function PendingApproval() {
  const [isLoading, setIsLoading] = useState(true);
  const [usersList, setUsersList] = useState([]);
  const [modal, setModal] = useState(false);
  const [courseList, setCourseList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] = useState({
    user_name: "",
    user_mobile: "",
    user_address: "",
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
  }, [usersList]);

  useEffect(() => {
    fetchingData();

    return () => {};
  }, []);

  const fetchingData = async () => {
    try {
      // rest login api here

      let reqOptions = {
        url: "/api/admin/approval/",
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      };

      const { status, data } = await Axios.request(reqOptions);

      setUsersList(data.body);
      setIsLoading(false);
    } catch (error) {
      console.log("====================================");
      console.log(error.response.data.msg);
      console.log("====================================");
    }
  };

  const deleteUser = async (uid) => {
    try {
      // rest login api here

      let headersList = {
        Accept: "*/*",
      };

      let reqOptions = {
        url: `/api/admin/approval/delete/${uid}`,
        method: "DELETE",
        headers: headersList,
      };

      let response = await Axios.request(reqOptions);
      //   console.log(response.data);
      StatusAlertService.showSuccess(response.data.msg);
      await fetchingData();
    } catch (error) {
      console.log("====================================");
      console.log(error.response.data.msg);
      console.log("====================================");
    }
  };
  const approveUser = async (uid) => {
    try {
      // rest login api here

      let bodyContent = JSON.stringify({
        id: uid,
      });
      let reqOptions = {
        url: `/api/admin/approval/add`,
        method: "PATCH",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        data: bodyContent,
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

      StatusAlertService.showSuccess(data.msg);
      await fetchingData();
    } catch (error) {
      console.log("====================================");
      console.log(error.response.data.msg);
      console.log("====================================");
    }
  };
  const showUserInfo = async (data) => {
    try {
      let headersList = {
        Accept: "*/*",
        "Content-Type": "application/json",
      };

      let bodyContent = JSON.stringify({
        id: data.id,
        user_role: data.user_role,
      });

      let reqOptions = {
        url: "/api/admin/approval/show",
        method: "POST",
        headers: headersList,
        data: bodyContent,
      };

      let response = await Axios.request(reqOptions);
      //   console.log(response.data);

      if (data.user_role == "student") {
        const { student_name, student_mobile, student_address } =
          response.data.body;
        setFormData({
          user_name: student_name,
          user_moblie: student_mobile,
          user_address: student_address,
        });
        // console.log(formData);
      } else if (data.user_role == "faculty") {
        const { faculty_name, faculty_mobile, faculty_address } =
          response.data.body;
        setFormData({
          user_name: faculty_name,
          user_moblie: faculty_mobile,
          user_address: faculty_address,
        });
      }

      toggle();

      // StatusAlertService.showSuccess(data.msg);
      // await fetchingData();
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
                  <h4>Non Approved Users</h4>
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
                      <th>email</th>
                      <th>Role</th>
                      <th>Course</th>
                      <th>Operation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersList
                      .filter((facultyObj) => {
                        if (facultyObj.flag == 2) {
                          return facultyObj;
                        }
                      })
                      .map((ls, i) => {
                        return (
                          <tr key={i}>
                            <th>{i + 1}</th>
                            <th>{ls.user_email}</th>
                            <th>{ls.user_role}</th>
                            <th>{ls.course_name}</th>
                            <th>
                              <span
                                className="btn btn-success rounded-circle mr-2"
                                onClick={() => approveUser(ls.id)}
                              >
                                <FontAwesomeIcon
                                  icon={"user-check"}
                                  color="#fff"
                                />
                              </span>
                              <span
                                className="btn btn-primary rounded-circle mr-2"
                                onClick={() => showUserInfo(ls)}
                              >
                                <FontAwesomeIcon
                                  icon={"info-circle"}
                                  color="#fff"
                                />
                              </span>
                              <span
                                className="btn btn-danger rounded-circle"
                                onClick={() => deleteUser(ls.id)}
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
                          type="text"
                          value={formData.user_name}
                          readOnly
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Moblie No</Label>
                        <Input
                          type="text"
                          value={formData.user_moblie}
                          readOnly
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Address</Label>
                        <Input
                          type="text"
                          value={formData.user_address}
                          readOnly
                        />
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
                {/*  */}
              </div>
            )}
          </CardBody>
        </Card>
      </Row>
    </Fragment>
  );
}
