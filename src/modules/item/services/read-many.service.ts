import { ItemRepository } from "../repositories/item.repository.js";
import DatabaseConnection, { IQuery } from "@src/database/connection.js";

export class ReadManyItemService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(query: IQuery) {
    const itemRepository = new ItemRepository(this.db);
    return await itemRepository.readMany(query);
  }
}
