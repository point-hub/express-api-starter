import { WarehouseRepository } from "../repositories/warehouse.repository.js";
import DatabaseConnection, { QueryInterface } from "@src/database/connection.js";

export class ReadManyWarehouseService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(query: QueryInterface) {
    const warehouseRepository = new WarehouseRepository(this.db);
    return await warehouseRepository.readMany(query);
  }
}
