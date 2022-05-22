import { Server } from "./server.js";
import { createApp } from "@src/app.js";
import { port } from "@src/config/server.js";

const server = new Server(createApp());

await server.start(port);

console.log(`[server]: Server is running at ${server.url}`);

export default server;
