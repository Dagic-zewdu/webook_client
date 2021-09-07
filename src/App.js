import React, { useEffect, useReducer, useState } from "react";
import "./css/Main.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { StoreContext } from "./components/contexts/contexts";
import { empState, employeeReducer } from "./store/Reducers/employeeReducers";
import {
  departmentReducer,
  depState,
} from "./store/Reducers/departmentReducer";
import { placeState, placeReducer } from "./store/Reducers/placReducers";
import { UserReducer, UserState } from "./store/Reducers/usersReducer";
import {
  fieldAllowanceReducer,
  fieldAllowanceState,
} from "./store/Reducers/FieldAllowance";
import ScripTag from "react-script-tag";
import { configReducer, configState } from "./store/Reducers/configReducer";
import { CompanyReducer, companyState } from "./store/Reducers/companyReducer";
import Home from "./components/routes/Home";
import Letter from "./components/routes/Letter";
import { lettersReducer, letterState } from "./store/Reducers/lettersReducer";
import {
  allowanceReducer,
  allowanceState,
} from "./store/Reducers/allowanceReducer";
import {
  climatePlacesReducer,
  climatePlaceState,
} from "./store/Reducers/climatePlacesReducer";
import {
  deductionReducer,
  deductionState,
} from "./store/Reducers/deductionReducer";
import ContactEmployee from "./components/routes/ContactEmployee";
import ChatRoom from "./components/routes/ChatRoom";
import { messageReducer, messageState } from "./store/Reducers/MessageReducer";
import { connReducer, connState } from "./store/Reducers/connectionReducer";
import OutBoxLetters from "./components/routes/OutBoxLetters";
import InBoxLetters from "./components/routes/InBoxLetters";

const App = () => {
  const [typing, setTyping] = useState(""); //chat typing
  const [Ltyping, setLTyping] = useState(""); //letter creating typing
  const [socket, setSocket] = useState("");
  const [employees, dispatchEmployees] = useReducer(employeeReducer, empState);
  const [department, dispatchDepartment] = useReducer(
    departmentReducer,
    depState
  );
  const [place, dispatchPlaces] = useReducer(placeReducer, placeState);
  const [users, dispatchUsers] = useReducer(UserReducer, UserState);
  const [fieldEmployees, dispatchFieldEmplooyees] = useReducer(
    fieldAllowanceReducer,
    fieldAllowanceState
  );
  const [config, dispatchConfig] = useReducer(configReducer, configState);
  const [company, dispatchCompany] = useReducer(CompanyReducer, companyState);
  const [letters, dispatchLetters] = useReducer(lettersReducer, letterState);
  const [allowances, dispatchAllowances] = useReducer(
    allowanceReducer,
    allowanceState
  );
  const [climatePlaces, dispatchClimatePlaces] = useReducer(
    climatePlacesReducer,
    climatePlaceState
  );
  const [deductions, dispatchDeductions] = useReducer(
    deductionReducer,
    deductionState
  );
  const [messages, dispatchMessages] = useReducer(messageReducer, messageState);
  const [connections, dispatchConnections] = useReducer(connReducer, connState);
  return (
    <StoreContext.Provider
      value={{
        socket,
        setSocket,
        messages,
        dispatchMessages,
        typing,
        setTyping,
        Ltyping,
        setLTyping, //user interaction when typing
        connections,
        dispatchConnections,
        allowances,
        dispatchAllowances,
        employees,
        dispatchEmployees,
        department,
        dispatchDepartment,
        place,
        dispatchPlaces,
        users,
        dispatchUsers,
        fieldEmployees,
        dispatchFieldEmplooyees,
        config,
        dispatchConfig,
        company,
        dispatchCompany,
        letters,
        dispatchLetters,
        climatePlaces,
        dispatchClimatePlaces,
        deductions,
        dispatchDeductions,
      }}
    >
      <ScripTag
        isHydrating={true}
        type="text/javascript"
        src="./css/assets/scripts/main.js"
      />
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/message/:id">
            <ChatRoom />
          </Route>
          <Route path="/message">
            <Letter />
          </Route>
          <Route path="/contact">
            <ContactEmployee />
          </Route>
          <Route path="/outbox">
            <OutBoxLetters />
          </Route>
          <Route path="/inbox">
            <InBoxLetters />
          </Route>
          {/* <Route path="/reports">
            <Reports />
          </Route> */}

          {/**system configuration route */}
        </Switch>
      </BrowserRouter>
    </StoreContext.Provider>
  );
};

export default App;
