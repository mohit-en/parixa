import React, { Fragment, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Row,
  Col,
  CardBody,
  Card,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import Axios from "axios";
import ReactLoading from "react-spinners/CircleLoader";
import { StatusAlertService } from "react-status-alert";

export default function ProfileScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const changePasswordHandle = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      // const emailCred = await EmailAuthProvider.credential(
      //   auth.currentUser.email,
      //   oldPassword
      // );

      // const res = await reauthenticateWithCredential(
      //   auth.currentUser,
      //   emailCred
      // );

      // await updatePassword(auth.currentUser, newPassword);

      StatusAlertService.showSuccess("Password Update Successfully");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      StatusAlertService.showError("Please Check Your Data");
      console.log(err);
    } finally {
      setIsLoading(false);
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
              <div className="text-dark">
                <h3>Profile</h3>

                <div className="d-flex justify-content-center">
                  <div
                    className="bg-primary d-flex align-items-center justify-content-center"
                    style={{ borderRadius: 50, height: 100, width: 100 }}
                  >
                    <img
                      src={require("../../assets/images/icons/yuvi.jpeg")}
                      style={{
                        borderRadius: 50,
                        height: 100,
                        width: 100,
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>

                {/*  */}
                <br />
                <h3>Change Password</h3>
                <Form onSubmit={(e) => changePasswordHandle(e)}>
                  <FormGroup>
                    <Label for="oldPassword">Old Password</Label>
                    <Input
                      id="oldPassword"
                      placeholder="Enter Old Password"
                      type="password"
                      onChange={(e) => setOldPassword(e.target.value)}
                      value={oldPassword}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      placeholder="Enter New Password"
                      type="password"
                      onChange={(e) => setNewPassword(e.target.value)}
                      value={newPassword}
                      required
                    />
                  </FormGroup>

                  <Button color="primary">Change Password</Button>
                </Form>
                {/*  */}
              </div>
            )}
          </CardBody>
        </Card>
      </Row>
    </Fragment>
  );
}
