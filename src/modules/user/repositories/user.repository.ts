import { BaseRepository } from "@src/database/base-repository.js";
import DatabaseConnection, { IDocument, IQuery, IResponseCreate } from "@src/database/connection.js";

export class UserRepository extends BaseRepository {
  constructor(db: DatabaseConnection) {
    super(db, "user");
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

  // public async update(filter: Filter<IDocument>, document: IDocument): Promise<unknown> {
  //   return await this.collection.updateOne(filter, document);
  // }

  // public async delete(filter: Filter<IDocument>): Promise<unknown> {
  //   return await this.collection.deleteOne(filter);
  // }

  // public async aggregate(filter: Array<IDocument>): Promise<unknown> {
  //   return await this.collection.aggregate(filter).toArray();
  // }
}
