import React, { Fragment, Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ListGroup,
  ListGroupItem,
  UncontrolledTooltip,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import avatar5 from "../../assets/images/avatars/avatar5.jpg";
export default function HeaderUserbox() {
  const navigate = useNavigate();
  return (
    <Fragment>
      <UncontrolledDropdown className="user-box position-relative ml-2">
        <DropdownToggle className="p-0  align-items-center">
          <div className="btn rounded-circle ">
            <FontAwesomeIcon icon={"user"} color="#fff" />
          </div>
        </DropdownToggle>
        <DropdownMenu right className="dropdown-menu-lg overflow-hidden p-0">
          <ListGroup flush className="text-left bg-transparent">
            <ListGroupItem className="rounded-top">
              <Nav pills className="nav-neutral-primary flex-column">
                <NavItem>
                  <NavLink
                    href="#/"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/admin/profile");
                    }}
                  >
                    My Profile
                  </NavLink>
                </NavItem>
              </Nav>
            </ListGroupItem>
            <ListGroupItem className="rounded-bottom p-3 text-center">
              <Button
                onClick={async (e) => {
                  try {
                    e.preventDefault();
                    const confirm = window.confirm("Are You Sure To Logout");
                    if (confirm) {
                      let headersList = {
                        Accept: "*/*",
                        "User-Agent":
                          "Thunder Client (https://www.thunderclient.com)",
                      };

                      let reqOptions = {
                        url: "/api/auth/logout",
                        method: "POST",
                        headers: headersList,
                      };

                      await axios.request(reqOptions);

                      navigate("/", { replace: true });
                    }
                  } catch (err) {
                    console.log(err);
                  }
                }}
                // color="twitter"
                id="btnTwitterTooltipHeader"
                container="body"
              >
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon icon={"power-off"} color="#fff" />
                </span>
              </Button>
            </ListGroupItem>
          </ListGroup>
        </DropdownMenu>
      </UncontrolledDropdown>
    </Fragment>
  );
}
