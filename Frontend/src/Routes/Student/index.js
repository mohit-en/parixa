import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Axios from "axios";
import { StatusAlertService } from "react-status-alert";

// import admin view
import StudentScreenView from "../../Views/Student";

export default function AdminRoute() {
  const user = { user_id: 1, user_role_name: "student" };

  return (
    <>
      {user.user_id && user.user_role_name === "student" ? (
        <Routes>
          <Route path="*" element={<StudentScreenView />} />
        </Routes>
      ) : (
        <Navigate to={"/"} replace={true} />
      )}
    </>
  );
}
