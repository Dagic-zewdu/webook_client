import axios from "axios";
import { host } from "../../components/config/config";
import { decrptObject, encryptObject } from "../../components/auth/encrypt";
import { userInfo } from "../../components/users/userInfo";
export const fetchEmployees = async () => {
  const employees = await axios.get(host + "/employee", {
    headers: { data: encryptObject(userInfo()) },
  });
  const Employees = decrptObject(employees.data);
  return Employees;
};
export const addEmployees = (employees) => {
  return {
    type: "ADD_EMPLOYEES",
    payload: employees,
  };
};
export const loadingEmployees = () => {
  return {
    type: "LOADING_EMPLOYEES",
  };
};
