import { lazy } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Route } from "react-router-dom";

//
import Dashboard from "./Screens/Dashboard";
// import Providers from "./Screens/Providers";
// import Users from "./Screens/Users";
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
  // {
  //   label: "Providers",
  //   icon: () => <FontAwesomeIcon icon={["fa", "building"]} color={"white"} />,
  //   to: "/admin/providers",
  //   route: "/providers",
  //   componet: <Providers />,
  //   isSideMenuComponent: true,
  // },
  // {
  //   label: "Users",
  //   icon: () => <FontAwesomeIcon icon={["fa", "users"]} color={"white"} />,
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
