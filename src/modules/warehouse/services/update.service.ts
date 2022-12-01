import { WarehouseEntity } from "../entities/warehouse.entity.js";
import { WarehouseRepository } from "../repositories/warehouse.repository.js";
import DatabaseConnection, { DocumentInterface } from "@src/database/connection.js";

export class UpdateWarehouseService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(filter: any, doc: DocumentInterface, session: unknown) {
    const warehouseEntity = new WarehouseEntity({
      name: doc.name,
      address: doc.address,
      phone: doc.phone,
    });

    const warehouseRepository = new WarehouseRepository(this.db);
    return await warehouseRepository.update(filter, warehouseEntity.warehouse, { session });
  }
}
