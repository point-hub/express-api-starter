import { UserRepository } from "../repositories/user.repository.js";
import DatabaseConnection, { DeleteOptionsInterface } from "@src/database/connection.js";

export class DestroyUserService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(id: string, options?: DeleteOptionsInterface) {
    const userRepository = new UserRepository(this.db);
    return await userRepository.delete(id, options);
  }
}
