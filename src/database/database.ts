import MongoDbConnection from "./connection-mongodb.js";
import DatabaseConnection from "./connection.js";
import { connection } from "@src/config/database.js";

export const db = new DatabaseConnection(
  new MongoDbConnection({
    name: connection[connection.default].name,
    protocol: connection[connection.default].protocol,
    host: connection[connection.default].host,
  })
);
