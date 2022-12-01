import { ExpeditionRepository } from "../repositories/expedition.repository.js";
import DatabaseConnection, { QueryInterface } from "@src/database/connection.js";

export class ReadManyExpeditionService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(query: QueryInterface) {
    const expeditionRepository = new ExpeditionRepository(this.db);
    return await expeditionRepository.readMany(query);
  }
}
