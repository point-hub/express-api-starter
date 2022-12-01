import { ItemRepository } from "../repositories/item.repository.js";
import DatabaseConnection, { QueryInterface } from "@src/database/connection.js";

export class ReadManyItemService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(query: QueryInterface) {
    const itemRepository = new ItemRepository(this.db);
    return await itemRepository.readMany(query);
  }
}
