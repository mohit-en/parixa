import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Axios from "axios";
import { StatusAlertService } from "react-status-alert";

// import admin view
import FacultyScreenView from "../../Views/Faculty";

export default function AdminRoute() {
  const user = { user_id: 1, user_role_name: "faculty" };

  return (
    <>
      {user.user_id && user.user_role_name === "faculty" ? (
        <Routes>
          <Route path="*" element={<FacultyScreenView />} />
        </Routes>
      ) : (
        <Navigate to={"/"} replace={true} />
      )}
    </>
  );
}
