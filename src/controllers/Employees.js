import { departmentClass } from "./Department";
import { removeDuplicates } from "./removeRedudant";

export class EmployeeClass extends departmentClass {
  constructor(employees, department) {
    super(department);
    this.employees = employees;
  }
  Filter = (id) => this.employees.filter((e) => e.emp_id === id);

  UnFilter = (id) => {
    let employee = this.employees.filter((e) => {
      return e.emp_id !== id;
    });
    return employee;
  };
  /**accepts emp_id and return employee object */
  Find = (id) => this.employees.find((e) => e.emp_id === id);
  /**return's object of employee info
   * @param {*} id -employee _id not emp_id
   */
  getUserInfo = (id) => this.employees.find((e) => e._id === id);

  Name = (id) => {
    let first_name = this.Find(id) ? this.Find(id).first_name : "";
    let middle_name = this.Find(id) ? this.Find(id).middle_name : "";
    let last_name = this.Find(id) ? this.Find(id).last_name : "";
    return first_name + " " + middle_name + " " + last_name;
  };

  Emp_id = (id) => {
    let emp_id = this.Find(id) ? this.Find(id).emp_id : "";
    return emp_id;
  };
  Department = (id) =>
    this.Find(id) ? this.dpName(this.Find(id).department) : "";
  UserRole = (id) => {
    let userole = this.Find(id) ? this.Find(id).type : "";
    return userole;
  };
  findUser = (id) => {
    let found = this.Filter(id).length ? true : false;
    return found;
  };

  Salary = (id) => (this.Find(id) ? this.Find(id).salary : 0);

  /**Accepts emp_id and returns position of  the official if it is official
   * employee.... returns empty string if the user is not found and
   * not official employee
   */
  position = (id) => (this.isOfficial(id) ? this.Find(id).position : "");
  /** returns first name and last Name only
     @param {*} emp_id =>string of emp_id
     */
  messageName = (emp_id) =>
    this.Name(emp_id).split(" ")[0] + " " + this.Name(emp_id).split(" ")[1];
  /**return's two first letter string of one letter from first name one letter from last name
   * @param {*} emp_id =>emp_id of the user
   */
  firstLetters = (emp_id) =>
    (
      this.messageName(emp_id).split(" ")[0].slice(0, 1) +
      this.messageName(emp_id).split(" ")[1].slice(0, 1)
    ).toUpperCase();
  /**return's an array of user resulted from searched
   * @param {*} Index - String to search
   */
  searchEmployee = (Index, Employees) => {
    let index = Index.toString().toLowerCase();
    let employees = Employees ? Employees : this.employees;
    //search by emp_id
    let emp_id = employees.filter((e) =>
      e.emp_id.toString().toLowerCase().includes(index, 0)
    );
    //search by name
    let name = employees.filter((n) =>
      this.Name(n.emp_id).toString().toLowerCase().includes(index, 0)
    );
    //search department
    let department = this.department.filter((e) =>
      e.name.toString().toLowerCase().includes(index, 0)
    );

    let position = employees.filter((e) =>
      e.position.toString().toLowerCase().includes(index, 0)
    );
    return removeDuplicates(
      [...name, ...department, ...emp_id, ...position],
      "_id"
    );
  };
}
