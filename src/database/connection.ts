import { ObjectId } from "mongodb";

export interface IDocument {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface IFilter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface IQuery {
  fields: string;
  filter: IFilter;
  page: number;
  limit: number;
  sort: string;
}

export interface IOptions {
  session: unknown;
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
  create(doc: IDocument, options?: unknown): Promise<IResponseCreate>;
  read(id: string, options?: unknown): Promise<IResponseRead>;
  readMany(query: IQuery, options?: unknown): Promise<IResponseReadMany>;
  update(filter: unknown, doc: IDocument, options?: unknown): Promise<unknown>;
  delete(filter: unknown): Promise<unknown>;
}

export interface IResponseCreate {
  _id: string;
  [key: string]: unknown;
}

export interface IResponseRead {
  _id?: ObjectId;
  [key: string]: unknown;
}

export interface IResponseReadMany {
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

  public database(name: string): this {
    this.adapter.database(name);
    return this;
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

  public async create(doc: IDocument, options?: unknown): Promise<IResponseCreate> {
    return await this.adapter.create(doc, options);
  }

  public async read(id: string, options: unknown): Promise<IResponseRead> {
    return await this.adapter.read(id, options);
  }

  public async readMany(query: IQuery, options?: unknown): Promise<IResponseReadMany> {
    return await this.adapter.readMany(query, options);
  }

  public async update(filter: unknown, document: IDocument, options?: unknown): Promise<unknown> {
    return await this.adapter.update(filter, document, options);
  }

  public async delete(filter: unknown): Promise<unknown> {
    return await this.adapter.delete(filter);
  }
}
