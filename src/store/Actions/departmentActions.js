import axios from "axios";
import { host } from "../../components/config/config";
import { decrptObject, encryptObject } from "../../components/auth/encrypt";
import { userInfo } from "../../components/users/userInfo";
export const fetchDepartment = async () => {
  const Department = await axios.get(host + "/department", {
    headers: { data: encryptObject(userInfo()) },
  });
  const department = decrptObject(Department.data);
  return department;
};
export const addDepartment = (Department) => {
  return {
    type: "ADD_DEPARTMENT",
    payload: Department,
  };
};
export const loadingDepartment = () => {
  return {
    type: "LOADING_DEPARTMENT",
  };
};
