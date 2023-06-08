import { lazy } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Route } from "react-router-dom";

//
import Dashboard from "./Screens/Dashboard";
import Students from "./Screens/Students";
import Faculty from "./Screens/Faculty";
import Course from "./Screens/Course";
import Subject from "./Screens/Subject";
import PendingApproval from "./Screens/PendingApproval";
// import Approval from "./Screens/Approval";
// import Profile from "./Screens/Profile";

const AllRoutes = [
  {
    label: "Dashboard",
    icon: () => <FontAwesomeIcon icon={["fa", "table"]} color={"white"} />,
    to: "/admin",
    route: "/",
    componet: <Dashboard />,
    isSideMenuComponent: true,
  },
  {
    label: "Course",
    icon: () => (
      <FontAwesomeIcon icon={["fa", "book-reader"]} color={"white"} />
    ),
    to: "/admin/course",
    route: "/course",
    componet: <Course />,
    isSideMenuComponent: true,
  },
  {
    label: "Subject",
    icon: () => <FontAwesomeIcon icon={["fa", "book"]} color={"white"} />,
    to: "/admin/Subject",
    route: "/Subject",
    componet: <Subject />,
    isSideMenuComponent: true,
  },
  {
    label: "Student",
    icon: () => <FontAwesomeIcon icon={["fa", "users"]} color={"white"} />,
    to: "/admin/students",
    route: "/students",
    componet: <Students />,
    isSideMenuComponent: true,
  },
  {
    label: "Faculty",
    icon: () => (
      <FontAwesomeIcon icon={["fa", "chalkboard-teacher"]} color={"white"} />
    ),
    to: "/admin/facultys",
    route: "/facultys",
    componet: <Faculty />,
    isSideMenuComponent: true,
  },
  {
    label: "Pending Request",
    icon: () => (
      <FontAwesomeIcon icon={["fa", "check-square"]} color={"white"} />
    ),
    to: "/admin/approval",
    route: "/approval",
    componet: <PendingApproval />,
    isSideMenuComponent: true,
  },
];

const SidebarMenuContent = AllRoutes.filter((ls) => {
  if (ls.isSideMenuComponent) {
    return ls;
  }
});

const getRoutes = () =>
  AllRoutes.map((route, i) => {
    return <Route exact path={route.route} element={route.componet} key={i} />;
  });

export { SidebarMenuContent, getRoutes };
