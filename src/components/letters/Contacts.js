import {
  faCircle,
  faComment,
  faObjectGroup,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Message } from "../../controllers/Message";
import { removeDuplicates } from "../../controllers/removeRedudant";
import { Donothing } from "../../controllers/saveProcess";
import { Notification, StoreContext } from "../contexts/contexts";

const Contacts = () => {
  const [state, setState] = useState({
    employees: [], // connected or discconnected users
  });
  const { users, employees, messages, department, letters } = useContext(StoreContext);

  const { state: Users, loading: userLoading } = users;
  const { state: Employees, loading: empLoading } = employees;
  const Messages = new Message(
    messages.state,
    letters.state,
    Users,
    Employees,
    department.state
  );
  const emp = Messages.UnFilter(Messages.getEmp_id());
  useEffect(() => {
    setState((s) => ({ employees: emp }));
  }, [userLoading, empLoading, Users]);
  /**search name elements with search index provide */
  const handleSearch = (index) =>
    setState((s) => ({
      employees: index ? Messages.searchEmployee(index, emp) : emp,
    }));
  /***online users */

  return (
    <div className="col-lg-12">
      <div className="container">
        <div className="row">
          <div className="col-lg-6"></div>
          <div className="col-lg-6">
            <div className="search-wrapper active">
              <div className="input-holder">
                <input
                  type="text"
                  className="search-input"
                  placeholder="type name,department,id"
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <button className="search-icon">
                  <span></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-card mb-3 min-height card">
        {Employees.length ? (
          state.employees.length ? (
            <div className="col-lg-12">
              <h4 className="contact-header text-center">Employees</h4>
              <MDBTable bordered striped>
                <MDBTableHead>
                  <tr>
                    <th className="text-center"># employee id</th>
                    <th className="text-center">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="fa-1x text-danger mx-2"
                      />
                      name
                    </th>
                    <th className="text-center">
                      <FontAwesomeIcon
                        icon={faObjectGroup}
                        className="fa-1x text-danger mx-2"
                      />
                      Department
                    </th>
                    <th className="text-center">
                      <FontAwesomeIcon
                        icon={faComment}
                        className="fa-1x text-danger mx-2"
                      />
                    </th>
                    <th className="text-center">status</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {state.employees.map((f) => {
                    return (
                      <tr key={f._id}>
                        <td className="text-center">{f.emp_id}</td>
                        <td className="text-center">
                          {Messages.Name(f.emp_id)}
                        </td>
                        <td className="text-center">
                          {Messages.dpName(f.department)}
                        </td>
                        <td className="text-center">
                          <Link to={"message/" + f.emp_id}>
                            {Messages.isOnline(f.emp_id) ? (
                              <button className="btn btn-success">
                                <FontAwesomeIcon
                                  icon={faComment}
                                  className="fa-1x mx-2"
                                />
                                contact
                              </button>
                            ) : (
                              <button className="btn">
                                <FontAwesomeIcon
                                  icon={faComment}
                                  className="fa-1x mx-2"
                                />
                                contact
                              </button>
                            )}
                          </Link>
                        </td>
                        <td className="text-center">
                          {Messages.isOnline(f.emp_id) ? (
                            <p>
                              <FontAwesomeIcon
                                icon={faCircle}
                                className="fa-1x text-success mx-2"
                              />
                              online
                            </p>
                          ) : (
                            <p>
                              <FontAwesomeIcon
                                icon={faCircle}
                                className="fa-1x mx-2"
                              />
                              offline
                            </p>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </MDBTableBody>
              </MDBTable>
            </div>
          ) : (
            <p></p>
          )
        ) : (
          <div className="container mt-5">
            <div className="row">
              <div className="col-lg-12">
                <h2 className="text-center">No Employees registered</h2>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contacts;
