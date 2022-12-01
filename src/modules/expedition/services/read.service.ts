import { ExpeditionRepository } from "../repositories/expedition.repository.js";
import DatabaseConnection, { FilterInterface } from "@src/database/connection.js";

export class ReadExpeditionService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(id: string) {
    const expeditionRepository = new ExpeditionRepository(this.db);
    return await expeditionRepository.read(id);
  }
}
