import MongoDbConnection from "./connection-mongodb.js";
import DatabaseConnection from "./connection.js";
import { connection } from "@src/config/database.js";

export const db = new DatabaseConnection(
  new MongoDbConnection({
    name: "starter",
    protocol: "mongodb",
    host: "localhost:27017",
  }),
  connection
);
