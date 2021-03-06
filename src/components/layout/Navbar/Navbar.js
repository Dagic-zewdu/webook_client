import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { LayoutContext, StoreContext } from "../../contexts/contexts";
import { withRouter } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faInfo,
  faPhone,
  faCalculator,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import { AllowanceClass } from "../../../controllers/Allowance";
import { Logout } from "../../users/Logout";
import { UsersClass } from "../../../controllers/Users";

const Navbar = (props) => {
  const [state, setState] = useState({
    search: "",
    toggleButton: "",
    title: "Shemsu Medebir",
    screen: 0,
    acivateProfile: "",
    profileOpener: "",
  });
  const setToggler = useContext(LayoutContext);
  const { togglers, uiContents } = setToggler;
  const { collapse, headertheme } = setToggler.uiContents;
  const { user_type, token } = localStorage;

  /**profiler */
  const { socket, department, employees, users } = useContext(StoreContext);
  const { state: Employees, loading: empLoading } = employees;
  const { state: Users, loading: userLoading } = users;
  const allowance = new UsersClass(
    users.state,
    employees.state,
    department.state
  );

  useEffect(() => {
    var x = 0;
    //if the user is not authenticated push to login
    user_type !== "system_admin" && token
      ? (x = 1)
      : props.history.push("/login.html");
    let { width } = window.screen;
    setState({ ...state, screen: width });
    if (width <= 892) {
      togglers({
        ...uiContents,
        collapse: "closed-sidebar-mobile closed-sidebar",
      });
    }
  }, [user_type, token]);
  const openSearch = () => {
    setState({ ...state, search: "active" });
  };
  const closeSearch = () => {
    setState({ ...state, search: "" });
  };
  const openProfile = () => {
    let { acivateProfile: op, profileOpener: po } = state;
    let { width } = window.screen;
    let acivateProfile = width <= 892 ? (op === "" ? "active" : "") : "";
    let profileOpener =
      width <= 892 ? (po === "" ? "header-mobile-open" : "") : "";
    setState({ ...state, acivateProfile, profileOpener });
  };
  const toggler = () => {
    let { toggleButton: button } = state;
    let toggleButton = button === "" ? "is-active" : "";
    let { width } = window.screen;
    let toggler =
      width <= 892
        ? collapse === "closed-sidebar-mobile closed-sidebar"
          ? "closed-sidebar-mobile closed-sidebar sidebar-mobile-open"
          : "closed-sidebar-mobile closed-sidebar"
        : collapse === ""
          ? "closed-sidebar"
          : "";
    togglers({ ...uiContents, collapse: toggler });
    setState({ ...state, toggleButton });
  };

  return (
    <div className={"app-header header-shadow " + headertheme}>
      <div className="app-header__logo">
        <h2 className="font-weight-bold show">
          Webook
          <FontAwesomeIcon icon={faBook} className="mx-2" />
        </h2>
        <div className="header__pane ml-auto">
          <div>
            <button
              type="button"
              className={
                "hamburger close-sidebar-btn hamburger--elastic " +
                state.toggleButton
              }
              data-classname="closed-sidebar"
              onClick={() => toggler()}
            >
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="app-header__mobile-menu">
        <div>
          <button
            type="button"
            className="hamburger hamburger--elastic mobile-toggle-nav"
            onClick={() => toggler()}
          >
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
        </div>
      </div>
      <div className="app-header__menu">
        <span>
          <button
            type="button"
            className={
              "btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav " +
              state.acivateProfile
            }
            onClick={() => openProfile()}
          >
            <span className="btn-icon-wrapper">
              <i className="fa fa-ellipsis-v fa-w-6"></i>
            </span>
          </button>
        </span>
      </div>
      <div className={"app-header__content " + state.profileOpener}>
        <div className="app-header-left">
          <ul className="header-menu nav">
            <li className="nav-item">
              <NavLink to="/contacts" className="nav-link">
                <FontAwesomeIcon icon={faPhone} className="nav-link-icon" />
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="app-header-right">
          <div className="header-btn-lg pr-0">
            <div className="widget-content p-0">
              <div className="widget-content-wrapper">
                <div className="widget-content-left">
                  <div className="btn-group">
                    <div
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      className="p-0 btn"
                    >
                      <h4 className="font-weight-bold">
                        [W]
                        <i className="fa fa-angle-down ml-2 opacity-8"></i>
                      </h4>
                    </div>
                    <div
                      tabIndex="-1"
                      role="menu"
                      aria-hidden="true"
                      className="dropdown-menu dropdown-menu-right"
                    >
                      <button
                        type="button"
                        onClick={() => Logout(props, socket, allowance.getEmp_id)}
                        tabIndex="0"
                        className="dropdown-item"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
                <div className="widget-content-left  ml-3 header-user-info">
                  <div className="widget-heading">
                    {allowance.Name(allowance.getEmp_id())}
                  </div>
                  <div className="widget-subheading">
                    {allowance.Department(allowance.getEmp_id())}{" "}
                    {allowance.UserRole(allowance.getEmp_id())}
                  </div>
                </div>
                <div className="widget-content-right header-user-info ml-3">
                  <button
                    type="button"
                    className="btn-shadow p-1 btn  btn-sm show-toastr-example"
                  >
                    <p
                      data-letters={allowance.firstLetters(
                        allowance.getEmp_id()
                      )}
                    ></p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Navbar);
