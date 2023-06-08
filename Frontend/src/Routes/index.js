import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// import admin, faculty, student route
import AdminRoute from "./Admin";
import FacultyRoute from "./Faculty";
import StudentRoute from "./Student";

// home route
import HomeRoute from "./Home";
import LoginRoute from "../Views/Other/Login/Login";
import LiveExamRoute from "../Views/Other/LiveExam";

// import 404 page
import Page404 from "../Views/Other/PageNotFound/PageNotFound";
import Registration from "../Views/Other/Login/Registration";

export default function IndexRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRoute />}></Route>
        <Route path="/login" element={<LoginRoute />}></Route>
        <Route path="/register" element={<Registration />}></Route>

        <Route path="/liveexam/:examId" element={<LiveExamRoute />}></Route>

        <Route path="/admin/*" element={<AdminRoute />}></Route>
        <Route path="/faculty/*" element={<FacultyRoute />}></Route>
        <Route path="/student/*" element={<StudentRoute />}></Route>
        <Route path="*" element={<Page404 />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
