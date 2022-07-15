import MongoDbConnection from "./connection-mongodb.js";
import DatabaseConnection from "./connection.js";
import { connection } from "@src/config/database.js";

const dbConnection = new DatabaseConnection(
  new MongoDbConnection({
    name: connection[connection.default].name,
    protocol: connection[connection.default].protocol,
    host: connection[connection.default].host,
  })
);

dbConnection.database(connection[connection.default].name);

export const db = dbConnection;
