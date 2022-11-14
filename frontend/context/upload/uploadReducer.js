import {
  SHOW_ALERT,
  CLEAN_ALERT,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
  CREATE_LINK_SUCCESS,
  CREATE_LINK_ERROR,
} from "../../types";

const uploadReducer = (state, action) => {
  switch (action.type) {
    case SHOW_ALERT:
    case CLEAN_ALERT:
    case UPLOAD_FILE_ERROR:
      return {
        ...state,
        msg_file: action.payload,
      };

    case UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        name: action.payload.name,
        name_original: action.payload.name_original,
      };
    default:
      return state;
  }
};

export default uploadReducer;
