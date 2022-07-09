import { createApp } from "@src/app.js";
import { port } from "@src/config/server.js";
import { Server } from "@src/server.js";

const server = new Server(await createApp());

await server.start(port);

console.log(`[server]: Server is running at ${server.url}`);

export default server;
