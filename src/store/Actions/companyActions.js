import axios from "axios";
import { host } from "../../components/config/config";
import { decrptObject, encryptObject } from "../../components/auth/encrypt";
import { userInfo } from "../../components/users/userInfo";
export const fetchCompany = async () => {
  const Company = await axios.get(host + "/company", {
    headers: { data: encryptObject(userInfo()) },
  });
  const company = decrptObject(Company.data);
  return company;
};
export const addCompany = (Company) => {
  return {
    type: "ADD_COMPANY",
    payload: Company,
  };
};
export const loadingCompany = () => {
  return {
    type: "LOADING_COMPANY",
  };
};
