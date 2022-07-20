import {
  MongoClient,
  MongoClientOptions,
  Filter,
  FindOptions,
  Document,
  Collection,
  Db,
  InsertOneOptions,
  BulkWriteOptions,
  UpdateOptions,
  DeleteOptions,
  AggregateOptions,
  ClientSession,
  DbOptions,
  CollectionOptions,
  SortDirection,
} from "mongodb";
import {
  IDatabaseAdapter,
  IResponseCreate,
  IResponseCreateMany,
  IResponseRead,
  IResponseReadAll,
} from "./connection.js";
import { fields, limit, page, skip, sort } from "./mongodb-util.js";

interface IDatabaseConfig {
  protocol: string;
  host: string;
  name: string;
  username?: string;
  password?: string;
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
    return "mongodb://localhost:27017";
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

  public async create(doc: Document, options?: InsertOneOptions): Promise<IResponseCreate> {
    if (!this._collection) {
      throw new Error("Collection not found");
    }

    const response = await this._collection.insertOne(doc, options ?? {});

    return {
      _id: response.insertedId.toString(),
    };
  }

  // public async createMany(docs: Array<Document>, options?: BulkWriteOptions): Promise<IResponseCreateMany> {
  //   const response = await this.collection("a").insertMany(docs, options ?? {});
  //   return {
  //     count: response.insertedCount,
  //     data: ["1"],
  //   };
  // }

  // public async read(filter: Filter<Document>, options?: FindOptions): Promise<unknown> {
  //   return await this.collection("a").findOne(filter, options ?? {});
  // }

  public async readAll(query: Filter<Document>, options?: FindOptions): Promise<IResponseReadAll> {
    if (!this._collection) {
      throw new Error("Collection not found");
    }

    const result = await this._collection
      .find(query.filter ?? {}, options ?? {})
      .limit(limit(query.limit))
      .skip(skip(page(query.page), limit(query.limit)))
      .sort(sort(query.sort))
      .project(fields(query.project))
      .toArray();

    const totalDocument = await this._collection.countDocuments();

    return {
      data: result as Array<IResponseRead>,
      page: page(query.page),
      totalDocument,
      totalPage: Math.round(totalDocument / limit(query.limit)),
      totalPerPage: limit(query.limit),
    };
  }

  // public async update(filter: Filter<Document>, document: Document, options?: UpdateOptions): Promise<unknown> {
  //   return await this.collection("a").updateOne(filter, document, options ?? {});
  // }

  // public async updateMany(filter: Filter<Document>, document: Document, options?: UpdateOptions): Promise<unknown> {
  //   return await this.collection("a").updateMany(filter, document, options ?? {});
  // }

  // public async delete(filter: Filter<Document>, options?: DeleteOptions): Promise<unknown> {
  //   return await this.collection("a").deleteOne(filter, options ?? {});
  // }

  // public async deleteMany(filter: Filter<Document>, options?: DeleteOptions): Promise<unknown> {
  //   return await this.collection("a").deleteMany(filter, options ?? {});
  // }

  // public async aggregate(filter: Array<Document>, options?: AggregateOptions): Promise<unknown> {
  //   return await this.collection("a")
  //     .aggregate(filter, options ?? {})
  //     .toArray();
  // }

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
