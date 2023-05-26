import React, { Fragment, Component } from "react";
import clsx from "clsx";

import { connect } from "react-redux";

import { SidebarHeader, SidebarMenu } from "../../layout-components";

import { useDispatch, useSelector } from "react-redux";

//
import { setSidebarToggleMobile } from "../../../../Redux/Slices/Theme/ThemeOptions";

export default function Sidebar() {
  const dispatch = useDispatch();
  const themeState = useSelector((state) => state.theme);

  const handleToggleSidebarMobile = () => {
    dispatch(setSidebarToggleMobile());
  };

  return (
    <Fragment>
      <div className="app-sidebar app-sidebar--dark">
        <SidebarHeader />
        <div className="app-sidebar--content">
          <SidebarMenu />
        </div>
      </div>
      <div
        onClick={handleToggleSidebarMobile}
        className={clsx("app-sidebar-overlay", {
          "is-active": themeState.sidebarToggleMobile,
        })}
      />
    </Fragment>
  );
}

// class Sidebar extends Component {
//   toggleSidebarMobile = () => {
//     let { sidebarToggleMobile, setSidebarToggleMobile } = this.props;
//     setSidebarToggleMobile(!sidebarToggleMobile);
//   };

//   render() {
//     let { sidebarToggleMobile } = this.props;

//     return (
//       <Fragment>
//         <div className="app-sidebar app-sidebar--dark">
//           <SidebarHeader />
//           <div className="app-sidebar--content">
//             <SidebarMenu />
//           </div>
//         </div>
//         <div
//           onClick={this.toggleSidebarMobile}
//           className={clsx("app-sidebar-overlay", {
//             "is-active": sidebarToggleMobile,
//           })}
//         />
//       </Fragment>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile,
// });

// const mapDispatchToProps = (dispatch) => ({
//   setSidebarToggleMobile: (enable) => dispatch(setSidebarToggleMobile(enable)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
