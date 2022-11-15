import { useReducer } from "react";
import clientAxios from "../../config/axios";
import uploadContext from "./uploadContext";
import uploadReducer from "./uploadReducer";
import {
  SHOW_ALERT,
  CLEAN_ALERT,
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
  CREATE_LINK_SUCCESS,
  CREATE_LINK_ERROR,
  CLEAN_STATE,
} from "../../types";

const UploadState = ({ children }) => {
  const initialState = {
    msg_file: null,
    name: "",
    name_original: "",
    loading: null,
    downloads: 1,
    password: "",
    author: null,
    url: "",
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
    dispatch({ type: UPLOAD_FILE });
    try {
      const response = await clientAxios.post("/api/files", formData);

      dispatch({
        type: UPLOAD_FILE_SUCCESS,
        payload: { name: response.data.file, name_original: nameFile },
      });
    } catch (err) {
      dispatch({ type: UPLOAD_FILE_ERROR, payload: err.response.data.msg });
    }
  };

  // Crea un enkace una vez que se subió el archivo
  const createLink = async () => {
    const data = {
      name: state.name,
      name_original: state.name_original,
      downloads: state.downloads,
      password: state.password,
    };

    try {
      const response = await clientAxios.post("/api/links", data);
      dispatch({
        type: CREATE_LINK_SUCCESS,
        payload: response.data.msg,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const cleanState = () => {
    dispatch({ type: "CLEAN_STATE" });
  };

  return (
    <uploadContext.Provider
      value={{
        msg_file: state.msg_file,
        name: state.name,
        name_original: state.name_original,
        loading: state.loading,
        downloads: state.downloads,
        password: state.password,
        author: state.author,
        url: state.url,
        showAlert,
        uploadFiles,
        createLink,
        cleanState,
      }}
    >
      {children}
    </uploadContext.Provider>
  );
};

export default UploadState;
