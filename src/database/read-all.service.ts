import { UserRepository } from "./user.repository.js";
import DatabaseConnection, { IQuery } from "@src/database/connection.js";

export class ReadManyUserService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(query: IQuery) {
    const userRepository = new UserRepository(this.db);
    return await userRepository.readMany(query);
  }
}
