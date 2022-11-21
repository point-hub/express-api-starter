import { BaseRepository } from "@src/database/base-repository.js";
import DatabaseConnection, { IDocument, IQuery, IResponseCreate } from "@src/database/connection.js";

export class ItemRepository extends BaseRepository {
  constructor(db: DatabaseConnection) {
    super(db, "item");
  }

  public async create(doc: IDocument, options: unknown): Promise<IResponseCreate> {
    return await this.collection().create(doc, options);
  }

  public async read(id: string, options?: unknown): Promise<unknown> {
    return await this.collection().read(id, options);
  }

  public async readMany(query: IQuery): Promise<unknown> {
    return await this.collection().readMany(query);
  }

  public async update(filter: any, document: IDocument, options: unknown): Promise<unknown> {
    return await this.collection().update(filter, document, options);
  }

  public async delete(filter: any): Promise<unknown> {
    return await this.collection().delete(filter);
  }
}
