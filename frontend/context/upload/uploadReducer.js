import {
  SHOW_ALERT,
  CLEAN_ALERT,
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
  CREATE_LINK_SUCCESS,
  CREATE_LINK_ERROR,
  CLEAN_STATE,
  SAVE_PASSWORD,
} from "../../types";

const uploadReducer = (state, action) => {
  switch (action.type) {
    case SHOW_ALERT:
    case CLEAN_ALERT:
      return {
        ...state,
        msg_file: action.payload,
      };

    case UPLOAD_FILE:
      return {
        ...state,
        loading: true,
      };

    case UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        name: action.payload.name,
        name_original: action.payload.name_original,
        loading: null,
      };

    case UPLOAD_FILE_ERROR:
      return {
        ...state,
        msg_file: action.payload,
        loading: null,
      };
    case CREATE_LINK_SUCCESS:
      return {
        ...state,
        url: action.payload,
      };

    case CLEAN_STATE:
      return {
        ...state,
        msg_file: null,
        name: "",
        name_original: "",
        loading: null,
        downloads: 1,
        password: "",
        author: null,
        url: "",
      };

    case SAVE_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };
    default:
      return state;
  }
};

export default uploadReducer;
