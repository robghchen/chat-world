import * as types from "../constants/ActionTypes";

const language = (state = "en", action) => {
  switch (action.type) {
    case types.CHANGE_LANGUAGE:
      return action.language;
    default:
      return state;
  }
};

export default language;
