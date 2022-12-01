import { RoleEntity, RoleInterface } from "../entities/role.entity.js";
import { RoleRepository } from "../repositories/role.repository.js";
import DatabaseConnection from "@src/database/connection.js";

export class ReadRoleService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(id: string) {
    const roleRepository = new RoleRepository(this.db);
    const result = (await roleRepository.read(id)) as unknown as RoleInterface;

    const role: RoleInterface = {
      _id: result._id as string,
      name: result.name as string,
    };
    const roleEntity = new RoleEntity(role);

    return roleEntity.role;
  }
}
