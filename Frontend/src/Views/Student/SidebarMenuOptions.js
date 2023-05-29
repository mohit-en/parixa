import { lazy } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Route } from "react-router-dom";

//
import Dashboard from "./Screens/Dashboard";
import Exam from "./Screens/Exam";
import ScheduleExamScreen from "./Screens/ScheduleExam";
import DoneExamScreen from "./Screens/DoneExam";

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
    label: "Today's Exam",
    icon: () => (
      <FontAwesomeIcon icon={["fa", "book-reader"]} color={"white"} />
    ),
    to: "/student/exam",
    route: "/exam",
    componet: <Exam />,
    isSideMenuComponent: true,
  },
  {
    label: "Shedule Exam",
    icon: () => (
      <FontAwesomeIcon icon={["fa", "clipboard-list"]} color={"white"} />
    ),
    to: "/student/sheduleexam",
    route: "/sheduleexam",
    componet: <ScheduleExamScreen />,
    isSideMenuComponent: true,
  },
  {
    label: "Done Exam",
    icon: () => (
      <FontAwesomeIcon icon={["fa", "calendar-check"]} color={"white"} />
    ),
    to: "/student/doneexam",
    route: "/doneexam",
    componet: <DoneExamScreen />,
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
