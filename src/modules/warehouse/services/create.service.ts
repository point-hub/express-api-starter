import { WarehouseEntity } from "../entities/warehouse.entity.js";
import { WarehouseRepository } from "../repositories/warehouse.repository.js";
import DatabaseConnection, { IDocument } from "@src/database/connection.js";

export class CreateWarehouseService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(doc: IDocument, session: unknown) {
    const warehouseEntity = new WarehouseEntity({
      name: doc.name,
      address: doc.address,
      phone: doc.phone,
      archived: false,
    });

    const warehouseRepository = new WarehouseRepository(this.db);
    return await warehouseRepository.create(warehouseEntity.warehouse, { session });
  }
}
