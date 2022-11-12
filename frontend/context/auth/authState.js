// Contiene las acciones que dispara lo que tenemos en el reducer
import { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";

import {
  SUCCESSFUL_REGISTER,
  ERROR_REGISTER,
  CLEAN_ALERT,
  AUTHENTICATED_USER,
} from "../../types";

import clientAxios from "../../config/axios";

const AuthState = ({ children }) => {
  //Definir un state inicial
  const initialState = {
    token: "",
    isAuth: null,
    user: null,
    message: null,
  };

  // Definir el reducer
  // La función dispatch manda a llamar las funciones definidas en el reducer
  // useReducer recibe la función reducer y el state inicial
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Registrar nuevos usuarios en la BD
  const signupUser = async (data) => {
    try {
      const {
        data: { msg },
      } = await clientAxios.post("/users", data);
      dispatch({
        type: SUCCESSFUL_REGISTER,
        payload: msg,
      });
    } catch (err) {
      dispatch({
        type: ERROR_REGISTER,
        payload: err.response.data.msg,
      });
    } finally {
      //Limpiar la alerta después de 3 segundos
      setTimeout(() => {
        dispatch({
          type: CLEAN_ALERT,
          payload: "",
        });
      }, 3000);
    }
  };

  // Usuario autenticado
  //payload: son los datos que van a modificar el state
  const authenticatedUser = (name) => {
    dispatch({
      type: AUTHENTICATED_USER,
      payload: name,
    });
  };

  return (
    <authContext.Provider
      value={{
        token: state.token,
        isAuth: state.isAuth,
        user: state.user,
        message: state.message,
        signupUser,
        authenticatedUser,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthState;
