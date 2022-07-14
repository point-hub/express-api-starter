import { CustomerRepository } from "./customer.repository.js";
import { UserEntity } from "./user.entity.js";
import { UserRepository } from "./user.repository.js";
import DatabaseConnection from "@src/database/connection.js";

export class CreateUserService {
  public static async handle(db: DatabaseConnection) {
    const userEntity = new UserEntity({
      username: "abcde",
    });
    const userRepository = new UserRepository(db);
    const customer = new CustomerRepository(db);

    userRepository.create(userEntity.user);
    customer.create({ username: "customer1" });
    userRepository.create({ username: "user2" });
    userRepository.create({ username: "user3" });
    customer.create({ username: "customer2" });
    // const userRepository = new UserRepository(db);
    // userRepository.createMany([userEntity.user, userEntity2.user]);
    // userRepository.create(userEntity.user);
    console.log("asd");
  }
}
