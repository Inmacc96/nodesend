// Va a contener las funciones que modifica al state
import {
  SUCCESSFUL_REGISTER,
  ERROR_REGISTER,
  CLEAN_ALERT,
  SUCCESS_LOGIN,
  ERROR_LOGIN,
  AUTHENTICATED_USER,
  LOG_OUT,
} from "../../types";

const authReducer = (state, action) => {
  switch (action.type) {
    case SUCCESSFUL_REGISTER:
    case ERROR_REGISTER:
    case ERROR_LOGIN:
    case CLEAN_ALERT:
      return {
        ...state,
        message: action.payload,
      };
    case SUCCESS_LOGIN:
      localStorage.setItem("token", action.payload);
      return {
        ...state,
        token: action.payload,
        isAuth: true,
      };
    case AUTHENTICATED_USER:
      return {
        ...state,
        user: action.payload,
        isAuth: true,
      };
    case LOG_OUT:
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
        isAuth: null,
      };
    default:
      return state;
  }
};

export default authReducer;
