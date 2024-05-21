import * as actionTypes from "./types";

const contextActions = (dispatch) => {
  return {
    startModal: {
      open: () => {
        dispatch({ type: actionTypes.OPEN_START_MODAL });
      },
      close: () => {
        dispatch({ type: actionTypes.CLOSE_START_MODAL });
      },
    },
    selectServiceModal: {
      open: () => {
        dispatch({ type: actionTypes.OPEN_SELECT_SERVICE_MODAL });
      },
      close: () => {
        dispatch({ type: actionTypes.CLOSE_SELECT_SERVICE_MODAL });
      },
    },
  };
};

export default contextActions;
