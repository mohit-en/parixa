import React, { Fragment, Component } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useNavigate, useLocation } from "react-router-dom";

//
import { SidebarMenuContent } from "../../SidebarMenuOptions";

//
import "./style.css";

const SidebarMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Fragment>
      <PerfectScrollbar>
        <div className="sidebar-navigation">
          {/* <div className="sidebar-header">
            <span>Navigation menu</span>
          </div> */}

          <div className="pure-menu custom-restricted-width">
            <ul className="pure-menu-list">
              {SidebarMenuContent.map((ls, i) => {
                var isSelected = location.pathname == ls.to ? true : false;
                return (
                  <li
                    className={`custom-item pure-menu-item ${
                      isSelected ? "pure-menu-selected" : ""
                    }`}
                    key={i}
                    onClick={() => navigate(ls.to)}
                  >
                    <a className="pure-menu-link ">
                      <span className="mr-2">{ls.icon()}</span>
                      {ls.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </PerfectScrollbar>
    </Fragment>
  );
};

export default SidebarMenu;
