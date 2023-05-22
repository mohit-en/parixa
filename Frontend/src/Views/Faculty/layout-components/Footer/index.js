import React, { Fragment } from "react";

import { Nav, NavItem, NavLink } from "reactstrap";

function Footer() {
  return (
    <Fragment>
      <div className="app-footer text-black-50">
        <div className="app-footer--second">
          © 2023 - crafted with <span className="text-danger px-1">❤</span> by{" "}
          Mohit Mistry
        </div>
      </div>
    </Fragment>
  );
}

export default Footer;
