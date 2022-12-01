import { UserEntity } from "../entities/user.entity.js";
import { UserRepository } from "../repositories/user.repository.js";
import DatabaseConnection, { CreateOptionsInterface, DocumentInterface } from "@src/database/connection.js";
import { hash } from "@src/utils/hash.js";

export class CreateUserService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(doc: DocumentInterface, options?: CreateOptionsInterface) {
    const userEntity = new UserEntity({
      username: doc.username,
      password: await hash(doc.password),
      email: doc.email,
      fullName: doc.fullName,
    });

    const userRepository = new UserRepository(this.db);
    return await userRepository.create(userEntity.user, options);
  }
}
