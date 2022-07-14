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
} from "mongodb";
import { IDatabaseAdapter, IResponseCreate, IResponseCreateMany } from "./connection.js";

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
  public _url = "";
  public _database: any;
  public _collection: any;
  veve() {
    return "veve mongodb";
  }
  constructor(config: IDatabaseConfig) {
    const options: MongoClientOptions = {};

    this.config = config;

    this.url();
    this.client = new MongoClient(this._url, options);
    this.database(config.name);
  }

  public url(): this {
    this._url = "mongodb://localhost:27017";
    return this;
  }

  public async open(): Promise<void> {
    await this.client.connect();
  }

  public async close(): Promise<void> {
    await this.client.close();
  }

  public database(name: string): this {
    this._database = this.client.db(name);
    return this;
  }

  public collection(name: string): this {
    this._collection = this._database.collection(name);
    return this;
  }

  public async create(doc: Document, options?: InsertOneOptions): Promise<IResponseCreate> {
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

  // public async readAll(filter: Filter<Document>, options?: FindOptions): Promise<unknown> {
  //   return await this.collection("a")
  //     .find(filter, options ?? {})
  //     .toArray();
  // }

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
}
