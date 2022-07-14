import { UserRepository } from "../../../database/user.repository.js";
import { UserEntity } from "../entities/user.entity.js";
import DatabaseConnection from "@src/database/connection.js";

export class UserCreateService {
  async handle(db: DatabaseConnection) {
    // const userEntity = new UserEntity({
    //   username: "Tesla",
    // });
    // const userRepository = new UserRepository(db);
    // userRepository.createMany([userEntity.user, userEntity2.user]);
    // userRepository.create(userEntity.user);
    console.log("asd");
  }
}
