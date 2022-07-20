import { ObjectId } from "mongodb";

export interface Document {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface IQuery {
  fields: string[];
  filter: Document;
  page: number;
  limit: number;
  sort: string[];
}

export interface IDatabaseAdapter {
  session: unknown;
  url(): string;
  open(): Promise<void>;
  close(): Promise<void>;
  database(name: string, options?: unknown): this;
  collection(name: string, options?: unknown): this;
  startSession(): unknown;
  endSession(): Promise<this>;
  startTransaction(): this;
  commitTransaction(): Promise<this>;
  abortTransaction(): Promise<this>;
  create(doc: Document, options?: unknown): Promise<IResponseCreate>;
  // createMany(docs: Array<Document>, options?: unknown): Promise<IResponseCreateMany>;
  // read(filter: unknown, options?: unknown): Promise<IResponseRead>;
  readAll(query: IQuery, options?: unknown): Promise<IResponseReadAll>;
  // update(filter: unknown, doc: Document): Promise<unknown>;
  // updateMany(filter: unknown, doc: Document): Promise<unknown>;
  // delete(filter: unknown): Promise<unknown>;
  // deleteMany(filter: unknown): Promise<unknown>;
  // aggregate(filter: unknown, options?: unknown): Promise<IResponseReadAll>;
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
  _id?: ObjectId;
  [key: string]: unknown;
}

export interface IResponseReadAll {
  data: Array<IResponseRead>;
  page: number;
  totalDocument: number;
  totalPage: number;
  totalPerPage: number;
}

export default class DatabaseConnection {
  private adapter: IDatabaseAdapter;

  constructor(adapter: IDatabaseAdapter) {
    this.adapter = adapter;
  }

  public url(): string {
    return this.adapter.url();
  }

  public async open(): Promise<void> {
    await this.adapter.open();
  }

  public async close(): Promise<void> {
    await this.adapter.close();
  }

  public database(name: string): IDatabaseAdapter {
    return this.adapter.database(name);
  }

  public collection(name: string): this {
    this.adapter.collection(name);
    return this;
  }

  public startSession() {
    this.adapter.startSession();
    return this.adapter.session;
  }

  public async endSession() {
    await this.adapter.endSession();
    return this;
  }

  public startTransaction() {
    this.adapter.startTransaction();
    return this;
  }

  public async commitTransaction() {
    await this.adapter.commitTransaction();
    return this;
  }

  public async abortTransaction() {
    await this.adapter.abortTransaction();
    return this;
  }

  public async create(doc: Document, options?: unknown): Promise<IResponseCreate> {
    return await this.adapter.create(doc, options);
  }

  // public async createMany(docs: Array<Document>): Promise<unknown> {
  //   console.log(docs);
  //   return await this.adapter.createMany(docs);
  // }

  // public async read(filter: unknown, options: unknown): Promise<unknown> {
  //   return await this.adapter.read(filter, options);
  // }

  public async readAll(query: IQuery, options?: unknown): Promise<IResponseReadAll> {
    return await this.adapter.readAll(query, options);
  }

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
