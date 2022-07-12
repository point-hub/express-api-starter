import { UserEntity } from "../entities/user.entity.js";
import { UserRepository } from "../repositories/user.repository.js";
import DatabaseConnection from "@src/database/connection.js";

export class UserCreateService {
  async handle(db: DatabaseConnection) {
    const userEntity = new UserEntity({
      username: "John",
    });
    const userRepository = new UserRepository(db);
    userRepository.create(userEntity.user);
  }
}
