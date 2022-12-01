import { CreateRoleInterface, RoleEntity } from "../entities/role.entity.js";
import { RoleRepository } from "../repositories/role.repository.js";
import DatabaseConnection, { DocumentInterface } from "@src/database/connection.js";

export class CreateRoleService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(doc: DocumentInterface, session: unknown) {
    const roleEntity = new RoleEntity({
      name: doc.name,
    });

    const roleRepository = new RoleRepository(this.db);
    return await roleRepository.create(roleEntity.role, { session });
  }
}
