import io from "socket.io-client";
import listenChatEvents from "./notification/chat";
import { SOCKET_EVENTS } from "../constants";
import { auth_request } from "./Service";
import { setAuthKey } from "../redux/authReducer";
import config from '../config.json';
const { SERVER } = config;

let socket;

const listenAllEvents = (dispatch) => {
  listenChatEvents(dispatch);
};

export const initConnection = (dispatch, props) => {
  disconnect();
  const { accessToken } = props;
  socket = io(SERVER, {
    auth: {
      accessToken,
    },
  });
  socket.on(SOCKET_EVENTS.CONNECTION_ERROR, async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    const userId = localStorage.getItem("userId");
    if (!userId || !refreshToken) {
      return;
    }
    auth_request(
      "post",
      `/api/auth/access/newAccessToken`,
      {
        userId,
        refreshToken,
      },
      ({ data }) => {
        dispatch(setAuthKey(["accessToken", data.accessToken]));
      },
      () => undefined
    );
  });
  listenAllEvents(dispatch);
};

export const disconnect = () => {
  socket?.disconnect();
};

export const emit = (event, data) => {
  if (!socket || !socket.connected) return false;
  socket.emit(event, data);
  return true;
};

export const listen = (event, action) => {
  socket.on(event, action);
};

export const emitForcefully = (event, data) => {
  if (!socket || !socket.connected)
    return setTimeout(() => {
      emitForcefully(event, data);
    }, 1000);

  socket.emit(event, data);
};

export const isConnected = () => {
  return socket && socket.connected;
};
