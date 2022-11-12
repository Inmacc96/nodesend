// Contiene las acciones que dispara lo que tenemos en el reducer
import { useReducer } from "react";
import authContext from "./authContext";

const AuthState = ({ children }) => {
  return <authContext.Provider value={{}}>{children}</authContext.Provider>;
};

export default AuthState;
