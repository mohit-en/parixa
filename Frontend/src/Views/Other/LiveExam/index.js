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
import { useParams } from "react-router-dom";
import Result from "./Result";

export default function LiveExamScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [questionList, setQuestionList] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [givenAnswersList, setGivenAnswersList] = useState([]);
  const [activeAnswerIndex, setActiveAnswerIndex] = useState(-1);
  const [isResultShown, setIsResultShown] = useState(false);
  const [marksInfo, setMarksInfo] = useState({
    totalScore: 0,
    totalSizeOfQuestions: 0,
  });

  //
  const params = useParams();

  // params.examId

  //
  useEffect(() => {
    fetchingData();

    return () => {};
  }, []);

  const fetchingData = async () => {
    try {
      // rest login api here

      let reqOptions = {
        url: `/api/student/examquestion/fetch/${params.examId}`,
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      };

      const { status, data } = await Axios.request(reqOptions);

      const { questions_list, start_time, end_time } = data.body;

      setGivenAnswersList(Array.from(Array(questions_list.length)));

      setQuestionList(questions_list);
      setIsLoading(false);
    } catch (error) {
      console.log("====================================");
      console.log(error.response.data.msg);
      console.log("====================================");

      if (error.response.data.body.isExamDone) {
        StatusAlertService.showInfo("You Had Already Done Your Exam");

        setTimeout(() => {
          window.close();
        }, 4000);
      }
    }
  };

  // Check Answer

  const checkAnswer = (event, index, correctAnswer) => {
    givenAnswersList[questionIndex] = index == correctAnswer;

    setActiveAnswerIndex(index);
  };

  // next question
  const nextQuestion = () => {
    if (questionIndex + 1 !== questionList.length) {
      setQuestionIndex(questionIndex + 1);
      setActiveAnswerIndex(-1);
    }
  };

  const showTheResult = async () => {
    var marks = givenAnswersList.filter((item) => item == true).length;

    setMarksInfo({
      totalScore: marks,
      totalSizeOfQuestions: questionList.length,
    });

    setIsResultShown(true);

    setQuestionList([]);

    setTimeout(() => {
      window.close();
    }, 10000);

    try {
      // rest login api here

      let bodyContent = JSON.stringify({
        marks_obtained: marks,
        exam_id: params.examId,
      });

      let reqOptions = {
        url: `/api/student/examquestion/add`,
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        data: bodyContent,
      };

      await Axios.request(reqOptions);
    } catch (error) {
      console.log("====================================");
      console.log(error.response.data.msg);
      console.log("====================================");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "black",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      {isLoading ? (
        <div className="d-flex align-items-center vh-100 justify-content-center text-center font-weight-bold font-size-lg py-3">
          <ReactLoading type={"bars"} color="#6C63FF" />
        </div>
      ) : (
        <>
          {isResultShown ? (
            <Result marksInfo={marksInfo} />
          ) : (
            <section className="bg-dark text-white">
              <div className="container">
                <div className="row vh-100 align-items-center justify-content-center">
                  <div className="col-lg-8">
                    <div
                      className="card p-4"
                      style={{
                        background: "#3d3d3d",
                        borderColor: "#646464",
                      }}
                    >
                      <div className="d-flex justify-content-between gap-md-3">
                        <h5 className="mb-2 fs-normal lh-base">
                          {questionList[questionIndex]?.question_text}
                          question
                        </h5>
                        <h5
                          style={{
                            color: "#60d600",
                            width: "100px",
                            textAlign: "right",
                          }}
                        >
                          {questionIndex + 1} / {questionList?.length}
                        </h5>
                      </div>
                      <div>
                        {questionList[questionIndex]?.options?.map(
                          (item, index) => {
                            const correctAnswer = questionList[
                              questionIndex
                            ]?.options.findIndex((ele) => ele.is_answer == 1);

                            return (
                              <button
                                key={index}
                                className={`option w-100 text-start btn text-white py-2 px-3 mt-3 rounded 
                            ${
                              activeAnswerIndex == index
                                ? "btn-success"
                                : "btn-dark"
                            }
                            `}
                                onClick={(event) =>
                                  checkAnswer(event, index, correctAnswer)
                                }
                              >
                                {item.option_text}
                              </button>
                            );
                          }
                        )}
                      </div>

                      {questionIndex + 1 !== questionList.length ? (
                        <button
                          className="btn py-2 w-100 mt-3 bg-primary text-light fw-bold"
                          onClick={nextQuestion}
                          disabled={activeAnswerIndex == -1}
                        >
                          Next Question
                        </button>
                      ) : (
                        <button
                          className="btn py-2 w-100 mt-3 bg-primary text-light fw-bold"
                          onClick={showTheResult}
                          disabled={activeAnswerIndex == -1}
                        >
                          Show Result
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
