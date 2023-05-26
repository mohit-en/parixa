import React, { Fragment, Component } from "react";

import { Link } from "react-router-dom";

import iconlogo from "../../assets/images/icons/icon.png";

class SidebarHeader extends Component {
  render() {
    return (
      <Fragment>
        <div className="app-sidebar--header">
          <div className="nav-logo">
            <Link
              to="/admin/"
              title="Bamburgh React Admin Dashboard with Reactstrap Free"
            >
              <img
                alt="Bamburgh React Admin Dashboard with Reactstrap Free"
                src={iconlogo}
                style={{ height: 50, width: 50 }}
              />
              <span>Knowledge Quest</span>
            </Link>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default SidebarHeader;
