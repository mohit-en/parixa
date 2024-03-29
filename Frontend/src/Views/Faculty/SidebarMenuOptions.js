import { lazy } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Route } from "react-router-dom";

//
import Dashboard from "./Screens/Dashboard";
import Students from "./Screens/Students";
import Faculty from "./Screens/Faculty";
import QuestionsScreen from "./Screens/Questions";
import DoneExam from "./Screens/DoneExam";
import ScheduleExamScreen from "./Screens/ScheduleExam";
// import Approval from "./Screens/Approval";
// import Profile from "./Screens/Profile";

const AllRoutes = [
  {
    label: "Dashboard",
    icon: () => <FontAwesomeIcon icon={["fa", "table"]} color={"white"} />,
    to: "/faculty",
    route: "/",
    componet: <Dashboard />,
    isSideMenuComponent: true,
  },
  {
    label: "questions",
    icon: () => (
      <FontAwesomeIcon icon={["fa", "book-reader"]} color={"white"} />
    ),
    to: "/faculty/questions",
    route: "/questions",
    componet: <QuestionsScreen />,
    isSideMenuComponent: true,
  },
  {
    label: "Schedule Exam",
    icon: () => <FontAwesomeIcon icon={["fa", "book"]} color={"white"} />,
    to: "/faculty/exam",
    route: "/exam",
    componet: <ScheduleExamScreen />,
    isSideMenuComponent: true,
  },
  {
    label: "Student",
    icon: () => <FontAwesomeIcon icon={["fa", "users"]} color={"white"} />,
    to: "/faculty/students",
    route: "/students",
    componet: <Students />,
    isSideMenuComponent: true,
  },
  {
    label: "Done Exam",
    icon: () => (
      <FontAwesomeIcon icon={["fa", "calendar-check"]} color={"white"} />
    ),
    to: "/faculty/doneexam",
    route: "/doneexam",
    componet: <DoneExam />,
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
