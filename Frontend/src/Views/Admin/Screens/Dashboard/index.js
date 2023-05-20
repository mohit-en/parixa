import React, { Fragment, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, CardBody, Card, Button } from "reactstrap";
import Axios from "axios";

//
import CustomLoading from "../../components/Loading";

export default function LivePreviewExample() {
  const [isLoading, setIsLoading] = useState(true);
  const [allData, setAllData] = useState({
    pendingApproval: 0,
    providers: 0,
    users: 0,
  });

  //
  useEffect(() => {
    // fetchingData();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {};
  }, []);

  // const fetchingData = async () => {
  //   try {
  //     // rest login api here

  //     let reqOptions = {
  //       url: "/api/admin/dashboard/fetch/",
  //       method: "POST",
  //       headers: {
  //         Accept: "*/*",
  //         "Content-Type": "application/json",
  //       },
  //       // data: JSON.stringify({
  //       //   token: userData.token,
  //       // }),
  //     };

  //     const { status, data } = await Axios.request(reqOptions);

  //     setAllData(data.body);

  //     console.log(data.body);
  //   } catch (err) {
  //     console.log(err.response);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <>
      {!isLoading ? (
        <Fragment>
          <Row>
            <Col lg="4">
              <Card className="card-box bg-premium-dark border-0 text-light mb-5">
                <CardBody>
                  <div className="d-flex align-items-start my-3">
                    <div className="font-weight-bold">
                      <small className="text-white-50 d-block mb-1 text-uppercase">
                        Total Providers
                      </small>
                      <span className="font-size-xxl mt-1">
                        {allData.providers}
                      </span>
                    </div>
                    <div className="ml-auto">
                      <div className="bg-white text-center text-success d-50 rounded-circle">
                        <FontAwesomeIcon
                          icon={["fa", "building"]}
                          className="font-size-xl"
                        />
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="card-box bg-midnight-bloom text-light mb-5">
                <CardBody>
                  <div className="d-flex align-items-start  my-3">
                    <div className="font-weight-bold">
                      <small className="text-white-50 d-block mb-1 text-uppercase">
                        Total Users
                      </small>
                      <span className="font-size-xxl mt-1">
                        {allData.users}
                      </span>
                    </div>
                    <div className="ml-auto">
                      <div className="bg-white text-center text-primary d-50 rounded-circle">
                        <FontAwesomeIcon
                          icon={["fa", "user-friends"]}
                          className="font-size-xl"
                        />
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="card-box bg-plum-plate text-light mb-5">
                <CardBody>
                  <div className="d-flex align-items-start  my-3">
                    <div className="font-weight-bold">
                      <small className="text-white-50 d-block mb-1 text-uppercase">
                        Pending Approval
                      </small>
                      <span className="font-size-xxl mt-1">
                        {allData.pendingApproval}
                      </span>
                    </div>
                    <div className="ml-auto">
                      <div className="bg-white text-center text-info d-50 rounded-circle">
                        <FontAwesomeIcon
                          icon={"hourglass-half"}
                          className="font-size-xl"
                        />
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Fragment>
      ) : (
        <CustomLoading />
      )}
    </>
  );
}
