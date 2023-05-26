import React, { Fragment, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, CardBody, Card, Button } from "reactstrap";
import Axios from "axios";
import ReactLoading from "react-spinners/CircleLoader";

// data table
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import "jquery/dist/jquery.min.js";

export default function ProviderScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [providerList, setProviderList] = useState([]);

  //
  useEffect(() => {
    $(document).ready(function () {
      $("#dataTable").DataTable();
    });

    return () => {};
  }, [providerList]);

  useEffect(() => {
    fetchingData();

    return () => {};
  }, []);

  const fetchingData = async () => {
    try {
      // rest login api here

      let reqOptions = {
        url: "/api/admin/providerlist/fetch",
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        // data: JSON.stringify({
        //   token: userData.token,
        // }),
      };

      const { status, data } = await Axios.request(reqOptions);

      setProviderList(data.body);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const blockApproval = async (uid) => {
    try {
      // rest login api here

      let reqOptions = {
        url: "/api/admin/providerlist/update",
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

  const removeApproval = async (uid) => {
    try {
      // rest login api here

      let reqOptions = {
        url: "/api/admin/approvallist/delete/",
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
              <table
                className="table table-bordered text-center"
                id="dataTable"
                cellSpacing={10}
                style={{ borderColor: "#B4B4B4", width: "99%" }}
              >
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Provider Name</th>
                    <th>Email</th>
                    <th>Operation</th>
                  </tr>
                </thead>
                <tbody>
                  {providerList.map((ls, i) => {
                    return (
                      <tr key={i}>
                        <th>{i + 1}</th>
                        <th>{ls.name}</th>
                        <th>{ls.email}</th>
                        <th>
                          <span
                            className="btn btn-danger rounded-circle mr-2"
                            onClick={() => blockApproval(ls.uid)}
                          >
                            <FontAwesomeIcon icon={"ban"} color="#fff" />
                          </span>
                          <span
                            className="btn btn-danger rounded-circle"
                            onClick={() => removeApproval(ls.uid)}
                          >
                            <FontAwesomeIcon icon={"trash"} color="#fff" />
                          </span>
                        </th>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </CardBody>
        </Card>
      </Row>
    </Fragment>
  );
}
