import * as actionTypes from "./types";

export const initialState = {
  isStartModalOpen: false,
  isSelectModalOpen: false,
};

export function contextReducer(state, action) {
  switch (action.type) {
    case actionTypes.OPEN_START_MODAL:
      return {
        ...state,
        isStartModalOpen: true,
      };
    case actionTypes.CLOSE_START_MODAL:
      return {
        ...state,
        isStartModalOpen: false,
      };

    case actionTypes.OPEN_SELECT_SERVICE_MODAL:
      return {
        ...state,
        isSelectModalOpen: true,
      };

    case actionTypes.CLOSE_SELECT_SERVICE_MODAL:
      return {
        ...state,
        isSelectModalOpen: false,
      };

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
