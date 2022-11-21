import { RoleRepository } from "../repositories/role.repository.js";
import DatabaseConnection, { IFilter } from "@src/database/connection.js";

export class ReadRoleService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(id: string) {
    const roleRepository = new RoleRepository(this.db);
    return await roleRepository.read(id);
  }
}
