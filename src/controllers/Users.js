import { EmployeeClass } from "./Employees";
import { removeDuplicates } from "./removeRedudant";

export class UsersClass extends EmployeeClass {
  constructor(users, employees, department) {
    super(employees, department);
    this.users = users;
  }
  //get _id from employee with emp_id
  getId = (Id) => {
    let id = Id ? Id : localStorage.id;
    let user = this.users.find((u) => {
      return u._id === id;
    });
    let User = user ? user : { emp_id: "" };
    let employee = this.Find(User.emp_id);
    return employee ? employee._id : "";
  };
  getEmp_id = (Id) => {
    let id = Id ? Id : localStorage.id;
    let user = this.users.find((u) => {
      return u._id === id;
    });
    let User = user ? user : { emp_id: "" };
    return User.emp_id;
  };
  /**return's array of employee with filtered employee type
       @param {*} type =>String which used filter 'director' ,'sector leader'...
      */
  position = (type) =>
    this.employees.filter(
      (e) => e.position === type && this.getEmp_id() !== e.emp_id
    );
  canApprove = (emp_id) =>
    this.Find(emp_id ? emp_id : this.getEmp_id())
      ? this.Find(emp_id ? emp_id : this.getEmp_id()).type === "Manager"
        ? true
        : false
      : false;
  /**
   * retun's an array of employee based on given array and employee type
   * @param {*} employees =>array of employees to search 
   @param {*} type =>String which used filter 'director' ,'sector leader'...
   */
  employeeSearch = (employees, type) =>
    employees.filter((e) => e.type === type && this.getEmp_id() !== e.emp_id);
  /**
   * return's array of contacts searched
   * @param {*} Index=>string to search
   */
  ContactSearch = (Index) => {
    let index = Index.toString().toLowerCase();
    let emp_id = this.employees.filter((e) =>
      e.emp_id.toString().toLowerCase().includes(index, 0)
    );
    let name = this.employees.filter((e) =>
      this.Name(e.emp_id).toString().toLowerCase().includes(index, 0)
    );
    let department = this.employees.filter((e) =>
      e.department.toString().toLowerCase().includes(index, 0)
    );
    let users = removeDuplicates([...emp_id, ...name, ...department], "_id");
    return {
      employees: removeDuplicates(
        [
          ...this.employeeSearch(users, "employee"),
          ...this.employeeSearch(users, "f_employee"),
        ],
        "_id"
      ),
      directors: this.employeeSearch(users, "director"),
      f_director: this.employeeSearch(users, "f_director"),
      team_leaders: removeDuplicates(
        [
          ...this.employeeSearch(users, "f_team_leader"),
          ...this.employeeSearch(users, "team_leader"),
        ],
        "_id"
      ),
      sector_leaders: this.employeeSearch(users, "sector_leader"),
      f_sector_leader: this.employeeSearch(users, "f_sector_leader"),
      commisioner: this.employeeSearch(users, "senior_officer"),
    };
  };
}
