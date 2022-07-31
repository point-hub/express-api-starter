import { BaseRepository } from "@src/database/base-repository.js";
import DatabaseConnection, {
  IDocument,
  IFilter,
  IQuery,
  IResponseCreate,
  IResponseCreateMany,
} from "@src/database/connection.js";

export class UserRepository extends BaseRepository {
  constructor(db: DatabaseConnection) {
    super(db, "user");
  }

  public async create(doc: IDocument, options: unknown): Promise<IResponseCreate> {
    console.log(doc);
    return await this.collection().create(doc, options);
  }

  public async createMany(docs: Array<IDocument>, options?: unknown): Promise<IResponseCreateMany> {
    return await this.collection().createMany(docs, options);
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

  // public async updateMany(filter: Filter<IDocument>, document: IDocument): Promise<unknown> {
  //   return await this.collection.updateMany(filter, document);
  // }

  // public async delete(filter: Filter<IDocument>): Promise<unknown> {
  //   return await this.collection.deleteOne(filter);
  // }

  // public async deleteMany(filter: Filter<IDocument>): Promise<unknown> {
  //   return await this.collection.deleteMany(filter);
  // }

  // public async aggregate(filter: Array<IDocument>): Promise<unknown> {
  //   return await this.collection.aggregate(filter).toArray();
  // }
}
