import { BaseRepository } from "./base-repository.js";
import DatabaseConnection, { IDocument, IResponseCreate } from "./connection.js";

export class CustomerRepository extends BaseRepository {
  constructor(db: DatabaseConnection) {
    super(db, "customer");
  }

  public async create(doc: IDocument, options: unknown): Promise<IResponseCreate> {
    return await this.collection().create(doc, options);
  }

  // public async createMany(docs: Array<IDocument>): Promise<unknown> {
  //   return await this.collection.insertMany(docs);
  // }

  // public async read(filter: Filter<IDocument>, options: FindOptions): Promise<unknown> {
  //   return await this.collection.findOne(filter, options);
  // }

  // public async readAll(filter: Filter<IDocument>): Promise<unknown> {
  //   return await this.collection.find(filter).toArray();
  // }

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
