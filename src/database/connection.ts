export interface Document {
  [key: string]: any;
}

export interface IDatabaseAdapter {
  session: unknown;
  url(): string;
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
  startSession(): this;
  endSession(): Promise<this>;
  startTransaction(): this;
  commitTransaction(): Promise<this>;
  abortTransaction(): Promise<this>;
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
}
