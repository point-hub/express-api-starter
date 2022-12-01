import { ItemEntity } from "../entities/item.entity.js";
import { ItemRepository } from "../repositories/item.repository.js";
import DatabaseConnection, { DocumentInterface } from "@src/database/connection.js";

export class UpdateItemService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(filter: any, doc: DocumentInterface, session: unknown) {
    const itemEntity = new ItemEntity({
      name: doc.name,
      address: doc.address,
      phone: doc.phone,
    });

    const itemRepository = new ItemRepository(this.db);
    return await itemRepository.update(filter, itemEntity.item, { session });
  }
}
