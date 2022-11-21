import { ExpeditionEntity } from "../entities/expedition.entity.js";
import { ExpeditionRepository } from "../repositories/expedition.repository.js";
import DatabaseConnection, { IDocument } from "@src/database/connection.js";

export class CreateExpeditionService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(doc: IDocument, session: unknown) {
    const expeditionEntity = new ExpeditionEntity({
      name: doc.name,
      address: doc.address,
      phone: doc.phone,
      archived: false,
    });

    const expeditionRepository = new ExpeditionRepository(this.db);
    return await expeditionRepository.create(expeditionEntity.expedition, { session });
  }
}
