import { ExpeditionRepository } from "../repositories/expedition.repository.js";
import DatabaseConnection, { IQuery } from "@src/database/connection.js";

export class ReadManyExpeditionService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(query: IQuery) {
    const expeditionRepository = new ExpeditionRepository(this.db);
    return await expeditionRepository.readMany(query);
  }
}
