import React, { lazy, Suspense } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ReactLoading from "react-spinners/CircleLoader";

// Layout Blueprints

import { LeftSidebar, PresentationLayout } from "./layout-blueprints";

//
import { getRoutes } from "./SidebarMenuOptions";

// Example Pages

const MyRoutes = () => {
  const location = useLocation();

  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.99,
    },
    in: {
      opacity: 1,
      scale: 1,
    },
    out: {
      opacity: 0,
      scale: 1.01,
    },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4,
  };

  return (
    <AnimatePresence>
      <Suspense
        fallback={
          <div className="d-flex align-items-center vh-100 justify-content-center text-center font-weight-bold font-size-lg py-3">
            <ReactLoading type={"bars"} color="#6C63FF" />
          </div>
        }
      >
        <LeftSidebar>
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Routes location={location} key={location.pathname}>
              {getRoutes()}

              {/*  */}
              {/* add route only above this line */}
              <Route path="*" element={<Navigate to={"/admin"} />} />
            </Routes>
          </motion.div>
        </LeftSidebar>
      </Suspense>
    </AnimatePresence>
  );
};

export default MyRoutes;
