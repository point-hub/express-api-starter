import DatabaseConnection, { IDocument, IResponseCreate, IResponseCreateMany } from "./connection.js";

export abstract class BaseRepository {
  public db: DatabaseConnection;
  public name: string;

  constructor(db: DatabaseConnection, name: string) {
    this.db = db;
    this.name = name;
  }

  collection() {
    return this.db.collection(this.name);
  }

  abstract create(doc: IDocument, options?: any): Promise<IResponseCreate>;
  // abstract createMany(docs: Array<IDocument>, options?: any): Promise<IResponseCreateMany>;
  // abstract read(filter: any, options?: any): Promise<unknown>;
  // abstract readAll(filter: any, options?: any): Promise<unknown>;
  // abstract update(filter: any, document: IDocument, options?: any): Promise<unknown>;
  // abstract updateMany(filter: any, document: IDocument, options?: any): Promise<unknown>;
  // abstract delete(filter: any, options?: any): Promise<unknown>;
  // abstract deleteMany(filter: any, options?: any): Promise<unknown>;
  // abstract aggregate(filter: Array<IDocument>, options?: any): Promise<unknown>;
}
