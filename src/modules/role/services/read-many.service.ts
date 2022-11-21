import { RoleRepository } from "../repositories/role.repository.js";
import DatabaseConnection, { IQuery } from "@src/database/connection.js";

export class ReadManyRoleService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(query: IQuery) {
    const roleRepository = new RoleRepository(this.db);
    return await roleRepository.readMany(query);
  }
}
