import { CustomerRepository } from "./customer.repository.js";
import { UserEntity } from "./user.entity.js";
import { UserRepository } from "./user.repository.js";
import DatabaseConnection, { IDocument } from "@src/database/connection.js";

export class CreateUserService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(doc: IDocument, session: unknown) {
    const userEntity = new UserEntity({
      username: doc.username,
      password: doc.password,
    });
    userEntity.suspendUser();

    const userRepository = new UserRepository(this.db);
    return await userRepository.create(userEntity.user, { session });
  }
}
