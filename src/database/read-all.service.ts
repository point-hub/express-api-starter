import { UserRepository } from "./user.repository.js";
import DatabaseConnection from "@src/database/connection.js";

export class ReadAllUserService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle() {
    const userRepository = new UserRepository(this.db);
    return await userRepository.readAll({});
  }
}
