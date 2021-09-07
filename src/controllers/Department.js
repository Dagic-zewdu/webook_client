export class departmentClass {
  constructor(department) {
    this.department = department;
  }
  find = (id) => this.department.find((d) => d._id === id);
  dpName = (id) => (this.find(id) ? this.find(id).name : "");
}
