import app from './app.js';
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer(app);
const PORT = 3001;

export const io = new Server(httpServer, {
  cors: {
    origin: "*", // danger
    methods: ["GET", "POST"],
    credentials: true
  }
});

httpServer.listen(PORT, () => {
  console.log(`### Server running on port ${PORT} ###`);
});
