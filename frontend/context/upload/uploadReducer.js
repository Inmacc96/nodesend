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
      return {
        ...state,
        msg_file: action.payload,
      };
    default:
      return state;
  }
};

export default uploadReducer;
