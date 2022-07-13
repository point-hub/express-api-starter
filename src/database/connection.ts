import { IDatabaseConfig } from "@src/config/database.js";

export interface Document {
  [key: string]: unknown;
}

export interface IDatabaseAdapter {
  url(): string;
  open(): Promise<void>;
  close(): Promise<void>;
  database(name: string): unknown;
  collection(name: string): unknown;
  create(doc: Document, options?: unknown): Promise<IResponseCreate>;
  createMany(docs: Array<Document>): Promise<unknown>;
  read(filter: unknown, options?: unknown): Promise<unknown>;
  readAll(filter: unknown, options?: unknown): Promise<unknown>;
  update(filter: unknown, doc: Document): Promise<unknown>;
  updateMany(filter: unknown, doc: Document): Promise<unknown>;
  delete(filter: unknown): Promise<unknown>;
  deleteMany(filter: unknown): Promise<unknown>;
  aggregate(filter: unknown, options?: unknown): Promise<unknown>;
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
  private config: IDatabaseConfig;
  private adapter: IDatabaseAdapter;

  constructor(adapter: IDatabaseAdapter, config: IDatabaseConfig) {
    this.adapter = adapter;
    this.config = config;
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

  public database(name: string): unknown {
    return this.adapter.database(name);
  }

  public collection(name: string): unknown {
    return this.adapter.collection(name);
  }

  public create(doc: Document): Promise<IResponseCreate> {
    return this.adapter.create(doc);
  }

  public async createMany(docs: Array<Document>): Promise<unknown> {
    console.log(docs);
    return await this.adapter.createMany(docs);
  }

  public async read(filter: unknown, options: unknown): Promise<unknown> {
    return await this.adapter.read(filter, options);
  }

  public async readAll(filter: unknown): Promise<unknown> {
    return await this.adapter.readAll(filter);
  }

  public async update(filter: unknown, document: Document): Promise<unknown> {
    return await this.adapter.update(filter, document);
  }

  public async updateMany(filter: unknown, document: Document): Promise<unknown> {
    return await this.adapter.updateMany(filter, document);
  }

  public async delete(filter: unknown): Promise<unknown> {
    return await this.adapter.delete(filter);
  }

  public async deleteMany(filter: unknown): Promise<unknown> {
    return await this.adapter.deleteMany(filter);
  }

  public async aggregate(filter: Array<Document>): Promise<unknown> {
    return await this.adapter.aggregate(filter);
  }
}
