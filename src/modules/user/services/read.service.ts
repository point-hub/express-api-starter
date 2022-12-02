import { UserRepository } from "../repositories/user.repository.js";
import DatabaseConnection, { ReadOptionsInterface } from "@src/database/connection.js";

export class ReadUserService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(id: string, options?: ReadOptionsInterface) {
    const userRepository = new UserRepository(this.db);
    return await userRepository.read(id, options);
  }
}
