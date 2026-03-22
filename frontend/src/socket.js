import { io } from "socket.io-client";
import { serverUrl } from "./main";

export const socket = io(serverUrl, {
  query: {
    userId: localStorage.getItem("userId"),
  },
});