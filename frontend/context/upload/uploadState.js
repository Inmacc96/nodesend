import { useReducer } from "react";
import uploadContext from "./uploadContext";
import uploadReducer from "./uploadReducer";
import {
  SHOW_ALERT,
  CLEAN_ALERT,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
  CREATE_LINK_SUCCESS,
  CREATE_LINK_ERROR,
} from "../../types";

const UploadState = ({ children }) => {
  const initialState = {
    msg_file: "",
  };

  // Crear state y dispatch
  const [state, dispatch] = useReducer(uploadReducer, initialState);

  // Muestra una alerta
  const showAlert = (msg) => {
    dispatch({ type: SHOW_ALERT, payload: msg });
  };
  return (
    <uploadContext.Provider value={{ msg_file: state.msg_file, showAlert }}>
      {children}
    </uploadContext.Provider>
  );
};

export default UploadState;
