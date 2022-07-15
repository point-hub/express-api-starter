import { IDatabaseConfig } from "@src/config/database.js";

export interface Document {
  [key: string]: unknown;
}

export interface IDatabaseAdapter {
  _database: unknown;
  url(): this;
  open(): Promise<void>;
  close(): Promise<void>;
  database(name: string): this;
  collection(name: string): this;
  create(doc: Document, options?: unknown): Promise<IResponseCreate>;
  // createMany(docs: Array<Document>): Promise<unknown>;
  // read(filter: unknown, options?: unknown): Promise<unknown>;
  // readAll(filter: unknown, options?: unknown): Promise<unknown>;
  // update(filter: unknown, doc: Document): Promise<unknown>;
  // updateMany(filter: unknown, doc: Document): Promise<unknown>;
  // delete(filter: unknown): Promise<unknown>;
  // deleteMany(filter: unknown): Promise<unknown>;
  // aggregate(filter: unknown, options?: unknown): Promise<unknown>;
}

export interface IResponseCreate {
  _id: string;
  [key: string]: unknown;
}

export interface IResponseCreateMany {
  count: number;
  data: Array<string>;
}

export interface IResponseRead {
  _id: string;
  [key: string]: unknown;
}

export interface IResponseReadAll {
  data: Array<IResponseRead>;
  page: number;
  totalPerPage: number;
  totalPage: number;
  totalDocument: number;
}

export default class DatabaseConnection {
  private adapter: IDatabaseAdapter;

  constructor(adapter: IDatabaseAdapter) {
    this.adapter = adapter;
  }

  public url(): IDatabaseAdapter {
    return this.adapter.url();
  }

  public async open(): Promise<void> {
    await this.adapter.open();
  }

  public async close(): Promise<void> {
    await this.adapter.close();
  }

  public database(name: string): IDatabaseAdapter {
    console.log("db");
    return this.adapter.database(name);
  }

  public collection(name: string): this {
    console.log("col");
    this.adapter.collection(name);
    return this;
  }

  public create(doc: Document): Promise<IResponseCreate> {
    console.log("create");
    return this.adapter.create(doc);
  }

  // public async createMany(docs: Array<Document>): Promise<unknown> {
  //   console.log(docs);
  //   return await this.adapter.createMany(docs);
  // }

  // public async read(filter: unknown, options: unknown): Promise<unknown> {
  //   return await this.adapter.read(filter, options);
  // }

  // public async readAll(filter: unknown): Promise<unknown> {
  //   return await this.adapter.readAll(filter);
  // }

  // public async update(filter: unknown, document: Document): Promise<unknown> {
  //   return await this.adapter.update(filter, document);
  // }

  // public async updateMany(filter: unknown, document: Document): Promise<unknown> {
  //   return await this.adapter.updateMany(filter, document);
  // }

  // public async delete(filter: unknown): Promise<unknown> {
  //   return await this.adapter.delete(filter);
  // }

  // public async deleteMany(filter: unknown): Promise<unknown> {
  //   return await this.adapter.deleteMany(filter);
  // }

  // public async aggregate(filter: Array<Document>): Promise<unknown> {
  //   return await this.adapter.aggregate(filter);
  // }
}
