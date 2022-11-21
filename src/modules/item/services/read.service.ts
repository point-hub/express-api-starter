import { ItemRepository } from "../repositories/item.repository.js";
import DatabaseConnection, { IFilter } from "@src/database/connection.js";

export class ReadItemService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(id: string) {
    const itemRepository = new ItemRepository(this.db);
    return await itemRepository.read(id);
  }
}
