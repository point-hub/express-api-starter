import { BaseRepository } from "./base-repository.js";
import DatabaseConnection, { Document, IResponseCreate } from "./connection.js";

export class UserRepository extends BaseRepository {
  constructor(db: DatabaseConnection) {
    super(db, "user");
  }

  public async create(doc: Document, options: unknown): Promise<IResponseCreate> {
    return await this.collection().create(doc, options);
  }

  // public async createMany(docs: Array<Document>): Promise<unknown> {
  //   return await this.collection.insertMany(docs);
  // }

  // public async read(filter: Filter<Document>, options: FindOptions): Promise<unknown> {
  //   return await this.collection.findOne(filter, options);
  // }

  // public async readAll(filter: Filter<Document>): Promise<unknown> {
  //   return await this.collection.find(filter).toArray();
  // }

  // public async update(filter: Filter<Document>, document: Document): Promise<unknown> {
  //   return await this.collection.updateOne(filter, document);
  // }

  // public async updateMany(filter: Filter<Document>, document: Document): Promise<unknown> {
  //   return await this.collection.updateMany(filter, document);
  // }

  // public async delete(filter: Filter<Document>): Promise<unknown> {
  //   return await this.collection.deleteOne(filter);
  // }

  // public async deleteMany(filter: Filter<Document>): Promise<unknown> {
  //   return await this.collection.deleteMany(filter);
  // }

  // public async aggregate(filter: Array<Document>): Promise<unknown> {
  //   return await this.collection.aggregate(filter).toArray();
  // }
}
