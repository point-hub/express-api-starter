import MongoDbConnection from "./connection-mongodb.js";
import DatabaseConnection from "./connection.js";
import { connection } from "@src/config/database.js";

const dbConnection = new DatabaseConnection(
  new MongoDbConnection({
    name: connection[connection.default].name,
    protocol: connection[connection.default].protocol,
    host: connection[connection.default].host,
    url: connection[connection.default].url,
  })
);
try {
  await dbConnection.open();
  dbConnection.database(connection[connection.default].name);
} catch (error) {
  throw error;
}

export const db = dbConnection;
