import io from "socket.io-client";

const URL = "http://localhost:5000";
let socket;

const listen = () => {
  socket.on("reply", console.log);
  socket.on("eventNotification", console.log);
};

export const initConnection = () => {
  socket = io(URL);
  listen();
};

export const disconnect = () => {
  socket.disconnect();
};

export const emit = (event, data) => {
  if (!socket || !socket.connected) return;
  socket.emit(event, data);
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
