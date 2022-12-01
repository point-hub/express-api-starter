import { ObjectId } from "mongodb";

export interface DocumentInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface FilterInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface QueryInterface {
  fields: string;
  filter: FilterInterface;
  page: number;
  limit: number;
  sort: string;
}

export interface CreateOptionsInterface {
  session: unknown;
}

export interface ReadOptionsInterface {
  session: unknown;
}

export interface ReadManyOptionsInterface {
  session: unknown;
}

export interface UpdateOptionsInterface {
  session: unknown;
}

export interface DeleteOptionsInterface {
  session: unknown;
}

export interface CreateResultInterface {
  _id: string;
  acknowledged: boolean;
}

export interface ReadResultInterface {
  _id: ObjectId;
  [key: string]: unknown;
}

export interface ReadManyResultInterface {
  data: Array<ReadResultInterface>;
  pagination: {
    page: number;
    totalDocument: number;
    totalPage: number;
    totalPerPage: number;
  };
}

export interface UpdateResultInterface {
  acknowledged: boolean;
  modifiedCount: number;
  upsertedId: ObjectId | string | null;
  upsertedCount: number;
  matchedCount: number;
}

export interface DeleteResultInterface {
  acknowledged: boolean;
  deletedCount: number;
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
  create(doc: DocumentInterface, options?: CreateOptionsInterface): Promise<CreateResultInterface>;
  read(id: string, options?: ReadOptionsInterface): Promise<ReadResultInterface>;
  readMany(query: QueryInterface, options?: ReadManyOptionsInterface): Promise<ReadManyResultInterface>;
  update(id: string, doc: DocumentInterface, options?: UpdateOptionsInterface): Promise<UpdateResultInterface>;
  delete(id: string, options?: DeleteOptionsInterface): Promise<DeleteResultInterface>;
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

  public async create(doc: DocumentInterface, options?: CreateOptionsInterface): Promise<CreateResultInterface> {
    return await this.adapter.create(doc, options);
  }

  public async read(id: string, options?: ReadOptionsInterface): Promise<ReadResultInterface> {
    return await this.adapter.read(id, options);
  }

  public async readMany(query: QueryInterface, options?: ReadManyOptionsInterface): Promise<ReadManyResultInterface> {
    return await this.adapter.readMany(query, options);
  }

  public async update(
    id: string,
    document: DocumentInterface,
    options?: UpdateOptionsInterface
  ): Promise<UpdateResultInterface> {
    return await this.adapter.update(id, document, options);
  }

  public async delete(id: string, options?: DeleteOptionsInterface): Promise<DeleteResultInterface> {
    return await this.adapter.delete(id, options);
  }
}
