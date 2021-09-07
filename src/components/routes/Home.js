import React, { useState, useContext } from "react";
import { LayoutContext, StoreContext } from "../contexts/contexts";
import Navbar from "../layout/Navbar/Navbar";
import SideNav from "../layout/SideNav/SideNav";
import { SpinnerLoading, DotLoading } from "../layout/Loading";
import { files_url } from "../config/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalculator, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Home = () => {
  const [state, setState] = useState({
    collapse: "",
  });
  const { company } = useContext(StoreContext);
  const { state: COMPANY, loading, error } = company;
  const Company = COMPANY[0];
  return (
    <div
      className={
        "app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header " +
        state.collapse
      }
    >
      <LayoutContext.Provider value={{ uiContents: state, togglers: setState }}>
        <Navbar />
        <div className="app-main">
          <SideNav />
        </div>
      </LayoutContext.Provider>
    </div>
  );
};

export default Home;
