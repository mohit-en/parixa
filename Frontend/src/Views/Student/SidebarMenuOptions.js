import { lazy } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Route } from "react-router-dom";

//
import Dashboard from "./Screens/Dashboard";
import Students from "./Screens/Students";
import Faculty from "./Screens/Faculty";
import QuestionsScreen from "./Screens/Questions";
import Subject from "./Screens/Subject";
import ScheduleExamScreen from "./Screens/Exam";
// import Approval from "./Screens/Approval";
// import Profile from "./Screens/Profile";

const AllRoutes = [
  {
    label: "Dashboard",
    icon: () => <FontAwesomeIcon icon={["fa", "table"]} color={"white"} />,
    to: "/student",
    route: "/",
    componet: <Dashboard />,
    isSideMenuComponent: true,
  },
  {
    label: "Exam",
    icon: () => (
      <FontAwesomeIcon icon={["fa", "book-reader"]} color={"white"} />
    ),
    to: "/student/exam",
    route: "/Exam",
    componet: <ScheduleExamScreen />,
    isSideMenuComponent: true,
  },
  // {
  //   label: "Subject",
  //   icon: () => <FontAwesomeIcon icon={["fa", "book"]} color={"white"} />,
  //   to: "/student/Subject",
  //   route: "/Subject",
  //   componet: <Subject />,
  //   isSideMenuComponent: true,
  // },
  // {
  //   label: "Student",
  //   icon: () => <FontAwesomeIcon icon={["fa", "users"]} color={"white"} />,
  //   to: "/student/students",
  //   route: "/students",
  //   componet: <Students />,
  //   isSideMenuComponent: true,
  // },
  // {
  //   label: "Faculty",
  //   icon: () => (
  //     <FontAwesomeIcon icon={["fa", "chalkboard-teacher"]} color={"white"} />
  //   ),
  //   to: "/faculty/facultys",
  //   route: "/facultys",
  //   componet: <Faculty />,
  //   isSideMenuComponent: true,
  // },

  // {
  //   label: "Users",
  //   icon: () => <FontAwesomeIcon icon={["fa", "users"]} color={"white"} />,
  // building
  //   to: "/admin/users",
  //   route: "/users",
  //   componet: <Users />,
  //   isSideMenuComponent: true,
  // },
  // {
  //   label: "Approval",
  //   icon: () => <FontAwesomeIcon icon={["fa", "user-check"]} color={"white"} />,
  //   to: "/admin/approval",
  //   route: "/approval",
  //   componet: <Approval />,
  //   isSideMenuComponent: true,
  // },
  // {
  //   label: "Profile",
  //   icon: () => <FontAwesomeIcon icon={["fa", "user"]} color={"white"} />,
  //   to: "/admin/profile",
  //   route: "/profile",
  //   componet: <Profile />,
  //   isSideMenuComponent: true,
  // },
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
