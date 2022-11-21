import { ItemEntity } from "../entities/item.entity.js";
import { ItemRepository } from "../repositories/item.repository.js";
import DatabaseConnection, { IDocument } from "@src/database/connection.js";

export class CreateItemService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(doc: IDocument, session: unknown) {
    const itemEntity = new ItemEntity({
      name: doc.name,
      address: doc.address,
      phone: doc.phone,
      archived: false,
    });

    const itemRepository = new ItemRepository(this.db);
    return await itemRepository.create(itemEntity.item, { session });
  }
}
