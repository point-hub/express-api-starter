import { RoleEntity } from "../entities/role.entity.js";
import { RoleRepository } from "../repositories/role.repository.js";
import DatabaseConnection, { IDocument } from "@src/database/connection.js";

export class UpdateRoleService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(filter: any, doc: IDocument, session: unknown) {
    const roleEntity = new RoleEntity({
      name: doc.name,
      address: doc.address,
      phone: doc.phone,
    });

    const roleRepository = new RoleRepository(this.db);
    return await roleRepository.update(filter, roleEntity.role, { session });
  }
}
