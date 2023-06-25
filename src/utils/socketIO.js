import io from "socket.io-client";
import listenChatEvents from "./notification/chat";

const URL = "http://localhost:5000";
const SOCKET_TOKEN = "SOCKET_TOKEN";

let socket;

const listenAllEvents = (dispatch) => {
  listenChatEvents(dispatch);
};

export const initConnection = (dispatch) => {
  socket = io(URL, {
    auth: {
      token: SOCKET_TOKEN
    }
  });
  listenAllEvents(dispatch);
};

export const disconnect = () => {
  socket.disconnect();
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
