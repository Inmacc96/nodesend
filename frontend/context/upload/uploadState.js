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
  return <uploadContext.Provider value={{}}>{children}</uploadContext.Provider>;
};

export default UploadState;
