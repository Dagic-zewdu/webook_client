import Axios from "axios";
import { host } from "../../components/config/config";
import { decrptObject, encryptObject } from "../../components/auth/encrypt";

import { userInfo } from "../../components/users/userInfo";
export const addLetters = (letters) => {
  return {
    type: "ADD_LETTERS",
    payload: letters,
  };
};
export const loadingLetters = () => {
  return {
    type: "LOADING_LETTERS",
  };
};
export const loadLetters = async () => {
  const L = await Axios.get(host + "/letters", {
    headers: { data: encryptObject(userInfo()) },
  });
  const l = decrptObject(L.data);
  return l;
};
