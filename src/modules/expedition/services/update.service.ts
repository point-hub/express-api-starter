import { ExpeditionEntity } from "../entities/expedition.entity.js";
import { ExpeditionRepository } from "../repositories/expedition.repository.js";
import DatabaseConnection, { DocumentInterface } from "@src/database/connection.js";

export class UpdateExpeditionService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(filter: any, doc: DocumentInterface, session: unknown) {
    const expeditionEntity = new ExpeditionEntity({
      name: doc.name,
      address: doc.address,
      phone: doc.phone,
    });

    const expeditionRepository = new ExpeditionRepository(this.db);
    return await expeditionRepository.update(filter, expeditionEntity.expedition, { session });
  }
}
