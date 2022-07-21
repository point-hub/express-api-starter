import { UserRepository } from "./user.repository.js";
import DatabaseConnection, { IFilter } from "@src/database/connection.js";

export class ReadOneUserService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    console.log(db);
    this.db = db;
  }
  public async handle(filter: IFilter) {
    const userRepository = new UserRepository(this.db);
    return await userRepository.read(filter);
  }
}
