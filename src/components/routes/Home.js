import React, { useState, useContext } from "react";
import { LayoutContext, StoreContext } from "../contexts/contexts";
import Navbar from "../layout/Navbar/Navbar";
import SideNav from "../layout/SideNav/SideNav";
import { SpinnerLoading, DotLoading } from "../layout/Loading";
import { files_url } from "../config/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faCalculator, faWindowClose } from "@fortawesome/free-solid-svg-icons";
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
          <div className="app-main__outer">
            <div className="app-main__inner">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <h1 className='text-center'>WEBOOK <FontAwesomeIcon icon={faBook} /></h1>
                    <h4 className="text-center">
                      <p className="text-center">
                        The word communication is a process of interaction with people and their environment. Through such types of interactions, two or more individuals influence the ideas, beliefs, and attitudes of each other.
                        Many methods of communication take place in both large and small business settings. Understanding the availability, benefits, and drawbacks of the various options can help business people choose the communication tools most likely to resonate with audiences. Today communication can occur in a variety of ways – in person, through print documents (letters and reports), through broadcast messages and meetings.
                        improving communication in an organization will make better work performance, effective time management, can reduce cost, and can save a lot of paperwork. Good communication in a task can have an impact on what will be executed in quality, quantity, and effectiveness.

                        Webook is our brand. This project is designed and developed for communication at the organizational level. It describes how communication is done in an organization and tries to automate custom communication.

                      </p>
                    </h4>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutContext.Provider>
    </div>
  );
};

export default Home;
