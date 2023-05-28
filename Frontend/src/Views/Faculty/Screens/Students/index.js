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

    return () => {};
  }, []);

  const fetchingData = async () => {
    try {
      // rest login api here

      let reqOptions = {
        url: "/api/faculty/student/fetch",
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
                      <th>Email</th>
                      <th>Mobile No</th>
                      <th>Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentsList.map((ls, i) => {
                      return (
                        <tr key={i}>
                          <th>{i + 1}</th>
                          <th>{ls.student_name}</th>
                          <th>{ls.user_email}</th>
                          <th>{ls.student_mobile}</th>
                          <th>{ls.student_address}</th>
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
