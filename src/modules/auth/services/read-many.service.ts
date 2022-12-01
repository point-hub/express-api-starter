import { UserRepository } from "../repositories/user.repository.js";
import DatabaseConnection, { QueryInterface } from "@src/database/connection.js";

export class ReadManyUserService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(query: QueryInterface) {
    const userRepository = new UserRepository(this.db);
    return await userRepository.readMany(query);
  }
}
