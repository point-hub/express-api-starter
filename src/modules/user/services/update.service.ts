import { UserEntity } from "../entities/user.entity.js";
import { UserRepository } from "../repositories/user.repository.js";
import DatabaseConnection, { IDocument } from "@src/database/connection.js";

export class UpdateUserService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(filter: any, doc: IDocument, session: unknown) {
    const userEntity = new UserEntity({
      username: doc.username,
      password: doc.password,
      email: doc.email,
      fullName: doc.fullName,
    });

    const userRepository = new UserRepository(this.db);
    return await userRepository.update(filter, userEntity.user, { session });
  }
}
