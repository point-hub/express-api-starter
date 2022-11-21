import { RoleEntity } from "../entities/role.entity.js";
import { RoleRepository } from "../repositories/role.repository.js";
import DatabaseConnection, { IDocument } from "@src/database/connection.js";

export class CreateRoleService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(doc: IDocument, session: unknown) {
    const roleEntity = new RoleEntity({
      name: doc.name,
      address: doc.address,
      phone: doc.phone,
      archived: false,
    });

    const roleRepository = new RoleRepository(this.db);
    return await roleRepository.create(roleEntity.role, { session });
  }
}
