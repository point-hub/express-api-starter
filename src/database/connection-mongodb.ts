import {
  MongoClient,
  MongoClientOptions,
  FindOptions,
  Collection,
  Db,
  InsertOneOptions,
  UpdateOptions,
  DeleteOptions,
  ClientSession,
  DbOptions,
  CollectionOptions,
  ObjectId,
} from "mongodb";
import {
  IDatabaseAdapter,
  DocumentInterface,
  QueryInterface,
  DeleteResultInterface,
  UpdateResultInterface,
  ReadManyResultInterface,
  ReadResultInterface,
  CreateResultInterface,
  CreateOptionsInterface,
  ReadOptionsInterface,
  ReadManyOptionsInterface,
  UpdateOptionsInterface,
  DeleteOptionsInterface,
} from "./connection.js";
import { fields, limit, page, skip, sort } from "./mongodb-util.js";

interface IDatabaseConfig {
  protocol: string;
  host: string;
  name: string;
  username?: string;
  password?: string;
  url?: string;
}

export default class MongoDbConnection implements IDatabaseAdapter {
  public client: MongoClient;
  public config: IDatabaseConfig;
  public _database: Db | undefined;
  public _collection: Collection | undefined;
  public session: ClientSession | undefined;

  constructor(config: IDatabaseConfig) {
    const options: MongoClientOptions = {};

    this.config = config;

    this.client = new MongoClient(this.url(), options);
  }

  public url(): string {
    return this.config.url ?? "";
  }

  /**
   * Open connection to connect the client to the server (optional starting in v4.7)
   * https://www.mongodb.com/docs/drivers/node/v4.8/fundamentals/connection/connect/
   */
  public async open(): Promise<void> {
    await this.client.connect();
  }

  public async close(): Promise<void> {
    await this.client.close();
  }

  public database(name: string, options?: DbOptions): this {
    this._database = this.client.db(name, options);
    return this;
  }

  public collection(name: string, options?: CollectionOptions): this {
    if (!this._database) {
      throw new Error("Database not found");
    }

    this._collection = this._database.collection(name, options);
    return this;
  }

  public async create(doc: DocumentInterface, options?: CreateOptionsInterface): Promise<CreateResultInterface> {
    if (!this._collection) {
      throw new Error("Collection not found");
    }

    const insertOneOptions = options as InsertOneOptions;

    const response = await this._collection.insertOne(doc, insertOneOptions);

    return {
      acknowledged: response.acknowledged,
      _id: response.insertedId.toString(),
    };
  }

  public async read(id: string, options?: ReadOptionsInterface): Promise<ReadResultInterface> {
    if (!this._collection) {
      throw new Error("Collection not found");
    }

    const readOptions = options as FindOptions;

    const result = await this._collection.findOne(
      {
        _id: new ObjectId(id),
      },
      readOptions
    );

    return {
      _id: new ObjectId(result?._id.toString()),
      ...result,
    };
  }

  public async readMany(query: QueryInterface, options?: ReadManyOptionsInterface): Promise<ReadManyResultInterface> {
    if (!this._collection) {
      throw new Error("Collection not found");
    }

    const readOptions = options as FindOptions;

    const cursor = this._collection
      .find(query.filter ?? {}, readOptions)
      .limit(limit(query.limit))
      .skip(skip(page(query.page), limit(query.limit)));

    if (sort(query.sort)) {
      cursor.sort(sort(query.sort));
    }

    if (fields(query.fields)) {
      cursor.project(fields(query.fields));
    }

    const result = await cursor.toArray();

    const totalDocument = await this._collection.countDocuments(query.filter ?? {}, readOptions);

    return {
      data: result as Array<ReadResultInterface>,
      pagination: {
        page: page(query.page),
        totalDocument,
        totalPage: Math.ceil(totalDocument / limit(query.limit)),
        totalPerPage: limit(query.limit),
      },
    };
  }

  public async update(
    id: string,
    document: DocumentInterface,
    options?: UpdateOptionsInterface
  ): Promise<UpdateResultInterface> {
    if (!this._collection) {
      throw new Error("Collection not found");
    }

    const updateOptions = options as UpdateOptions;

    const result = await this._collection.updateOne({ _id: new ObjectId(id) }, { $set: document }, updateOptions);

    return {
      acknowledged: result.acknowledged,
      modifiedCount: result.modifiedCount,
      upsertedId: result.upsertedId,
      upsertedCount: result.upsertedCount,
      matchedCount: result.matchedCount,
    };
  }

  public async delete(id: string, options?: DeleteOptionsInterface): Promise<DeleteResultInterface> {
    if (!this._collection) {
      throw new Error("Collection not found");
    }

    const deleteOptions = options as DeleteOptions;

    const result = await this._collection.deleteOne(
      {
        _id: new ObjectId(id),
      },
      deleteOptions
    );

    return {
      acknowledged: result.acknowledged,
      deletedCount: result.deletedCount,
    };
  }

  public startSession() {
    this.session = this.client.startSession();
    return this.session;
  }

  public async endSession(): Promise<this> {
    await this.session?.endSession();
    return this;
  }

  public startTransaction() {
    this.session?.startTransaction();
    return this;
  }

  public async commitTransaction() {
    await this.session?.commitTransaction();
    return this;
  }

  public async abortTransaction() {
    await this.session?.abortTransaction();
    return this;
  }
}
