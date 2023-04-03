import React from "react";
import { Route, Routes } from "react-router-dom";

// import home view
import HomeScreenView from "../../Views/Home";

export default function HomeRoute() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreenView />} />
    </Routes>
  );
}
