import { RoleInterface } from "../entities/role.entity.js";
import { RoleRepository } from "../repositories/role.repository.js";
import DatabaseConnection, { QueryInterface } from "@src/database/connection.js";

export class ReadManyRoleService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(query: QueryInterface) {
    const roleRepository = new RoleRepository(this.db);
    const result = await roleRepository.readMany(query);

    return {
      roles: result.data as unknown as Array<RoleInterface>,
      pagination: result.pagination,
    };
  }
}
