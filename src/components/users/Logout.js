import { Socket } from "socket.io-client";

export const Logout = (props, socket, emp_id) => {
  localStorage.removeItem("id");
  localStorage.removeItem("token");
  localStorage.removeItem("auth");
  localStorage.removeItem("user_type");
  localStorage.removeItem("emp_id");
  socket.emit("disConnect", { emp_id });
  props.history.push("/login.html");
};
