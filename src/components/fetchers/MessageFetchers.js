import React, { useContext, useEffect } from "react";
import { Donothing } from "../../controllers/saveProcess";
import { UsersClass } from "../../controllers/Users";
import { webSocket } from "../../socket";
import { addConn } from "../../store/Actions/connectionAction";
import { addLetters } from "../../store/Actions/letterActions";
import { addMessages } from "../../store/Actions/messageActions";
import { addUsers } from "../../store/Actions/userActions";
import { StoreContext } from "../contexts/contexts";

const MessageFetchers = () => {
  const {
    socket,
    dispatchMessages,
    dispatchUsers,
    dispatchLetters,
    setTyping,
    setLTyping,
    setSocket,
    department, employees, users
  } = useContext(StoreContext);
  setSocket(webSocket);
  const { } = useContext(StoreContext);
  const { state: Employees, loading: empLoading } = employees;
  const { state: Users, loading: userLoading } = users;
  const allowance = new UsersClass(
    users.state,
    employees.state,
    department.state
  );
  useEffect(() => {
    try {
      socket
        ? socket.emit("onConnect", { emp_id: allowance.getEmp_id() })
        : Donothing();
      socket ? socket.emit("users", "") : Donothing();
      socket
        ? socket.on("users", (data) => {
          dispatchUsers(addUsers(data))
        })
        : Donothing();
      socket ? socket.emit("chat", "") : Donothing();
      socket
        ? socket.on("chat", (data) => dispatchMessages(addMessages(data)))
        : Donothing();
      socket
        ? socket.on("typing", (data) => setTyping(data.emp_id))
        : Donothing(); //chat typing
      socket
        ? socket.on("typing_letter", (data) => setLTyping(data.emp_id))
        : Donothing(); //letter typing
      socket ? socket.emit("letters", "") : Donothing();
      socket
        ? socket.on("letters", (data) => dispatchLetters(addLetters(data)))
        : Donothing();
    } catch (err) {
      dispatchUsers({ type: "Error" });
      dispatchMessages({ type: "Error" });
    }
  }, [socket, empLoading]);
  return <div></div>;
};

export default MessageFetchers;
