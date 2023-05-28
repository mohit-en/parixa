import React from "react";

const Result = ({ marksInfo: { totalScore, totalSizeOfQuestions } }) => {
  return (
    <section className="bg-dark text-white">
      <div className="container">
        <div className="row vh-100 align-items-center justify-content-center">
          <div className="col-lg-6">
            <div
              className={`text-light text-center p-5 rounded ${
                totalScore > totalSizeOfQuestions / 2
                  ? "bg-success"
                  : "bg-danger"
              }`}
            >
              <h1 className="mb-2 fw-bold">
                {totalScore > totalSizeOfQuestions / 2 ? "Awesome!" : "Oops!"}
              </h1>
              <h3 className="mb-3 fw-bold">
                Your score is {totalScore} out of {totalSizeOfQuestions}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Result;
