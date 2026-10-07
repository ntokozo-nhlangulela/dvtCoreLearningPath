import { Server as HttpServer } from "http";
import { Server } from "socket.io";

let io: Server;

export function initializeSocket(server: HttpServer) {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  io.on("connection", (socket) => {
    console.log(`Connected: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`Disconnected: ${socket.id}`);
    });
  });

  return io;
}

export function getIO() {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }

  return io;
}