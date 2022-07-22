import { UserRepository } from "../repositories/user.repository.js";
import DatabaseConnection, { IFilter } from "@src/database/connection.js";

export class ReadUserService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(filter: IFilter) {
    const userRepository = new UserRepository(this.db);
    return await userRepository.read(filter);
  }
}
