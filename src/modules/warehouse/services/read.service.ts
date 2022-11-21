import { WarehouseRepository } from "../repositories/warehouse.repository.js";
import DatabaseConnection, { IFilter } from "@src/database/connection.js";

export class ReadWarehouseService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(id: string) {
    const warehouseRepository = new WarehouseRepository(this.db);
    return await warehouseRepository.read(id);
  }
}
