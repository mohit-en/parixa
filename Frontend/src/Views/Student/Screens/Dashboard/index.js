import React, { Fragment, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, CardBody, Card, Button } from "reactstrap";
import Axios from "axios";

//
import CustomLoading from "../../components/Loading";

export default function LivePreviewExample() {
  const [isLoading, setIsLoading] = useState(true);
  const [allData, setAllData] = useState({
    totalStudents: 0,
    totalFaculty: 0,
    totalCourse: 0,
  });

  //
  useEffect(() => {
    fetchingData();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {};
  }, []);

  const fetchingData = async () => {
    try {
      let headersList = {
        Accept: "*/*",
      };

      let reqOptions = {
        url: "/api/faculty/",
        method: "POST",
        headers: headersList,
      };

      let response = await Axios.request(reqOptions);
      // console.log(response.data.body);
      setAllData(response.data.body);
    } catch (err) {
      console.log(err.response);
    } finally {
      setIsLoading(false);
    }
  };

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
                        Total MCQS
                      </small>
                      <span className="font-size-xxl mt-1">
                        {allData.totalStudents}
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
                        Total Students Given exam
                      </small>
                      <span className="font-size-xxl mt-1">
                        {allData.totalFaculty}
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
                        Total Scheduled exam
                      </small>
                      <span className="font-size-xxl mt-1">
                        {allData.totalCourse}
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
