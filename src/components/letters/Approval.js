import {
  faBackward,
  faForward,
  faLevelUpAlt,
  faObjectGroup,
  faPlus,
  faTrash,
  faUser,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import React, { useContext, usevalues, useEffect } from "react";
import { Donothing } from "../../controllers/saveProcess";
import { UsersClass } from "../../controllers/Users";
import { LetterContext, StoreContext } from "../contexts/contexts";

const Approval = () => {
  const { values, setValues, emp_id } = useContext(LetterContext);
  const { employees, users, department } = useContext(StoreContext);
  const { state: Employees, loading: empLoading, error: empError } = employees;
  const { state: Users, loading: usersLoading, error: usersError } = users;
  const user = new UsersClass(Users, Employees, department.state);
  const { type } = values;

  /**retun's a number of maximum step of approval*/
  const approvalMax = () => {
    let i = 0;
    values.approval_manager.map((e) =>
      e.step > i ? (i = e.step) : Donothing()
    );
    values.f_director.map((e) => (e.step > i ? (i = e.step) : Donothing()));
    return i;
  };
  /** set the values value of approval managaer if it is not finance director if finance director
   * set f_director
   * @param {*} id=>String of emp_id
   * @param {*} type => string manager if the employee is different from finance director and fd if the user is finance director
   *
   */
  const addManager = (id) => {
    values.approval_manager.find((e) => e.emp_id === id)
      ? Donothing()
      : setValues((s) => ({
          ...s,
          approval_manager: [
            ...s.approval_manager,
            { emp_id: id, step: approvalMax() + 1 },
          ],
        }));

    // managerSort()
    //  FD_Sort()
  };
  /** set level for approval for approval manager
   * @param {*} emp_id String of emp_id
   * @param {*} step number step to set
   */
  const MsetLevel = (emp_id, step) => {
    setValues((s) => ({
      ...s,
      approval_manager: step
        ? [
            ...s.approval_manager.filter((e) => e.emp_id !== emp_id),
            { emp_id, step },
          ]
        : s.approval_manager,
    }));
  };

  const removeManager = (emp_id) =>
    setValues((s) => ({
      ...s,
      approval_manager: s.approval_manager.filter((e) => e.emp_id !== emp_id),
    }));

  const handleSearch = (index) =>
    setValues({
      ...values,
      employees: index !== "" ? user.searchEmployee(index) : [],
    });
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4"></div>
        <div className="col-lg-6">
          <div className="search-wrapper active">
            <div className="input-holder">
              <input
                type="text"
                className="search-input"
                placeholder="Search employee name,department,userole"
                onChange={(e) => handleSearch(e.target.value)}
              />
              <button className="search-icon">
                <span></span>
              </button>
            </div>
          </div>
        </div>
        <div className="col-lg-2"></div>
        <div className="col-lg-12 mt-2">
          <MDBTable>
            <MDBTableHead>
              <tr>
                <th># Employee id</th>
                <th>
                  <FontAwesomeIcon icon={faUser} className="mx-2" />
                  Employee name
                </th>
                <th>
                  <FontAwesomeIcon icon={faObjectGroup} className="mx-2" />
                  Department
                </th>
                <th>
                  <FontAwesomeIcon icon={faUserAlt} className="mx-2" />
                  User role
                </th>
                <th>
                  <FontAwesomeIcon icon={faPlus} className="mx-2" />
                  Select
                </th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {values.employees.length ? (
                values.employees.map((e) => {
                  return (
                    <tr key={e._id}>
                      <td className="text-center font-weight-bold">
                        {e.emp_id}
                      </td>
                      <td>{user.Name(e.emp_id)}</td>
                      <td>{user.Department(e.department)}</td>
                      <td>{e.type}</td>
                      <td>
                        <button
                          className="btn btn-info"
                          onClick={() => addManager(e.emp_id)}
                        >
                          <FontAwesomeIcon icon={faPlus} className="mx-2" />
                          select
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center text-danger font-weight-bold"
                  >
                    No Employees found
                  </td>
                </tr>
              )}
            </MDBTableBody>
          </MDBTable>
        </div>
        <div className="col-lg-12 my-2">
          <h3 className="text-center">Approval Managers</h3>
        </div>
        <div className="col-lg-12 my-2">
          <MDBTable>
            <MDBTableHead>
              <tr>
                <th># Employee id</th>
                <th>
                  <FontAwesomeIcon icon={faUser} className="mx-2" />
                  Employee name
                </th>
                <th>
                  <FontAwesomeIcon icon={faObjectGroup} className="mx-2" />
                  Department
                </th>
                <th>
                  <FontAwesomeIcon icon={faUserAlt} className="mx-2" />
                  User role
                </th>
                <th>
                  <FontAwesomeIcon icon={faLevelUpAlt} className="mx-2" />
                  step to approve
                </th>
                <th>
                  <FontAwesomeIcon icon={faPlus} className="mx-2" />
                  set approval step
                </th>
                <th>
                  <FontAwesomeIcon icon={faTrash} className="mx-2" />
                  Remove
                </th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {!values.approval_manager.length && !values.f_director.length ? (
                <tr>
                  <td colSpan={6} className="text-center font-weight-bold">
                    No Employess added for approval
                  </td>
                </tr>
              ) : (
                values.approval_manager.map((e) => {
                  return (
                    <tr key={e.emp_id}>
                      <td className="text-center font-weight-bold">
                        {e.emp_id}
                      </td>
                      <td>{user.Name(e.emp_id)}</td>
                      <td>{user.Department(e.emp_id)}</td>
                      <td>{user.UserRole(e.emp_id)}</td>
                      <td>{e.step}</td>
                      <td className="text-center input-container">
                        <p className="mx-2">set Level</p>
                        <input
                          type="number"
                          className="input-field"
                          onChange={(ev) =>
                            MsetLevel(e.emp_id, parseInt(ev.target.value))
                          }
                        />
                      </td>
                      <td
                        className="text-center"
                        onClick={() => removeManager(e.emp_id)}
                      >
                        <FontAwesomeIcon icon={faTrash} className="fa-1x" />
                      </td>
                    </tr>
                  );
                })
              )}
            </MDBTableBody>
          </MDBTable>
        </div>
        <div className="col-lg-6 mt-3">
          <div
            className="btn-danger btn"
            onClick={() => setValues({ ...values, tab: "create" })}
          >
            <FontAwesomeIcon icon={faBackward} className="text-white" />
            Back
          </div>
        </div>
        <div className="col-lg-6 mt-3">
          <button
            type="submit"
            className="btn btn-info float-right"
            onClick={() =>
              setValues({ ...values, tab: "participant", step: 4 })
            }
          >
            <FontAwesomeIcon icon={faForward} className="text-white" />
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Approval;
