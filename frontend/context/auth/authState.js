// Contiene las acciones que dispara lo que tenemos en el reducer
import { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";

import {
  SUCCESSFUL_REGISTER,
  ERROR_REGISTER,
  CLEAN_ALERT,
  SUCCESS_LOGIN,
  ERROR_LOGIN,
  AUTHENTICATED_USER,
  LOG_OUT,
} from "../../types";

import clientAxios from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";

const AuthState = ({ children }) => {
  //Definir un state inicial
  const initialState = {
    token: typeof window !== "undefined" ? localStorage.getItem("token") : "",
    isAuth: null,
    user: null,
    message: null,
  };

  // Definir el reducer
  // La función dispatch manda a llamar las funciones definidas en el reducer
  // useReducer recibe la función reducer y el state inicial
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Registrar nuevos usuarios en la BD
  //payload: son los datos que van a modificar el state

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
          payload: null,
        });
      }, 3000);
    }
  };

  // Autenticar usuarios
  const logIn = async (data) => {
    try {
      const {
        data: { token },
      } = await clientAxios.post("/auth", data);
      dispatch({
        type: SUCCESS_LOGIN,
        payload: token,
      });
    } catch (err) {
      dispatch({
        type: ERROR_LOGIN,
        payload: err.response.data.msg,
      });
    } finally {
      //Limpiar la alerta después de 3 segundos
      setTimeout(() => {
        dispatch({
          type: CLEAN_ALERT,
          payload: null,
        });
      }, 3000);
    }
  };

  // Obtener el usuario autenticado en base al JWT
  const getAuthenticatedUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const {
        data: { user },
      } = await clientAxios("/auth");
      dispatch({
        type: AUTHENTICATED_USER,
        payload: user,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Cerrar sesión
  const logOut = () => {
    dispatch({
      type: "LOG_OUT",
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
        logIn,
        getAuthenticatedUser,
        logOut,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthState;
