import { useReducer } from "react";
import clientAxios from "../../config/axios";
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
    msg_file: null,
    name: "",
    name_original: "",
  };

  // Crear state y dispatch
  const [state, dispatch] = useReducer(uploadReducer, initialState);

  // Muestra una alerta
  const showAlert = (msg) => {
    dispatch({ type: SHOW_ALERT, payload: msg });

    setTimeout(() => {
      dispatch({ type: CLEAN_ALERT, payload: null });
    }, 3000);
  };

  // Sube los archivos al servidor
  const uploadFiles = async (formData, nameFile) => {
    try {
      const response = await clientAxios.post("/files", formData);

      dispatch({
        type: UPLOAD_FILE_SUCCESS,
        payload: { name: response.data.file, name_original: nameFile },
      });
    } catch (err) {
      dispatch({ type: UPLOAD_FILE_ERROR, payload: error.response.data.msg });
    }
  };
  return (
    <uploadContext.Provider
      value={{
        msg_file: state.msg_file,
        name: state.name,
        name_original: state.name_original,
        showAlert,
        uploadFiles,
      }}
    >
      {children}
    </uploadContext.Provider>
  );
};

export default UploadState;
