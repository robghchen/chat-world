import * as types from "../constants/ActionTypes";
import { addUser, messageReceived, populateUsersList } from "../actions";
import { cookies } from "../utils/cookies";
import { googleTranslate } from "../utils/googleTranslate";

const setupSocket = (dispatch, username) => {
  const socket = new WebSocket("ws://localhost:8989");

  socket.onopen = () => {
    socket.send(
      JSON.stringify({
        type: types.ADD_USER,
        name: username
      })
    );
  };
  socket.onmessage = event => {
    const data = JSON.parse(event.data);
    let msg = data.message ? data.message : "";

    switch (data.type) {
      case types.ADD_MESSAGE:
        googleTranslate.detectLanguage(msg, function(err, detection) {
          if (detection.language !== cookies.get("language")) {
            googleTranslate.translate(msg, cookies.get("language"), function(
              err,
              translation
            ) {
              msg = translation.translatedText;
              dispatch(messageReceived(msg, data.author));
            });
          } else {
            dispatch(messageReceived(msg, data.author));
          }
        });

        break;
      case types.ADD_USER:
        dispatch(addUser(data.name));
        break;
      case types.USERS_LIST:
        dispatch(populateUsersList(data.users));
        break;
      default:
        break;
    }
  };
  return socket;
};

export default setupSocket;
