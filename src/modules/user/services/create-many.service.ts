import { UserRepository } from "../repositories/user.repository.js";
import DatabaseConnection, { IDocument } from "@src/database/connection.js";

export class CreateManyUserService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(body: IDocument, session: unknown) {
    const userRepository = new UserRepository(this.db);
    return await userRepository.createMany(body.users, { session });
  }
}
