import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { LayoutContext, StoreContext } from "../../contexts/contexts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperclip,
  faStamp,
  faCalculator,
  faMapMarker,
  faChartBar,
  faInfo,
  faUsers,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import EmployeeFetcher from "../../fetchers/employeeFetchers";
import UsersFetcher from "../../fetchers/UsersFetcher";
import CompanyFetcher from "../../fetchers/CompanyFetcher";

import MessageFetchers from "../../fetchers/MessageFetchers";
import { UsersClass } from "../../../controllers/Users";
import DepartmentFetch from "../../fetchers/departmentFetch";
const SideNav = () => {
  const setToggler = useContext(LayoutContext);
  const { sidetheme } = setToggler.uiContents;

  return (
    <div className={"app-sidebar sidebar-shadow " + sidetheme}>
      <div className="app-header__logo">
        <DepartmentFetch />
        <EmployeeFetcher />
        <CompanyFetcher />
        <MessageFetchers />
        <div className="header__pane ml-auto">
          <div>
            <button
              type="button"
              className="hamburger close-sidebar-btn hamburger--elastic"
              data-classname="closed-sidebar"
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
            className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav"
          >
            <span className="btn-icon-wrapper">
              <i className="fa fa-ellipsis-v fa-w-6"></i>
            </span>
          </button>
        </span>
      </div>{" "}
      <div className="scrollbar-sidebar">
        <div className="app-sidebar__inner">
          <ul className="vertical-nav-menu">
            <li className="app-sidebar__heading">Webook</li>

            <li className="app-sidebar__heading">
              <FontAwesomeIcon
                icon={faPaperclip}
                className="metismenu-icon pe-7s-diamond fa-2x text-info mx-2"
              />
              Document
            </li>

            <li>
              <NavLink to="/inbox">
                <i className="metismenu-icon pe-7s-display2"></i>
                <p className="font-weight-bold">Letter</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/message">
                <i className="metismenu-icon pe-7s-display2"></i>
                <p className="font-weight-bold">message</p>
              </NavLink>
            </li>
            <li className="app-sidebar__heading">
              <FontAwesomeIcon
                icon={faUsers}
                className="metismenu-icon pe-7s-diamond fa-2x text-info mx-2"
              />
              Employess
            </li>
            <li>
              <NavLink to="/contact">
                <i className="metismenu-icon pe-7s-display2"></i>
                <p className="font-weight-bold">contact</p>
              </NavLink>
            </li>

            <li></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
