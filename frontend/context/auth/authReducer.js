// Va a contener las funciones que modifica al state
import { SUCCESSFUL_REGISTER, AUTHENTICATED_USER } from "../../types";

const authReducer = (state, action) => {
  switch (action.type) {
    case SUCCESSFUL_REGISTER:
      return {
        ...state,
        message: action.payload,
      };
    case AUTHENTICATED_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
