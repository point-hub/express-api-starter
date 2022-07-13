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
  private config: IDatabaseConfig;

  constructor(config: IDatabaseConfig) {
    const options: MongoClientOptions = {};

    this.config = config;

    this.client = new MongoClient(this.url(), options);
  }

  public url(): string {
    return "mongodb://localhost:27017";
  }

  public async open(): Promise<void> {
    await this.client.connect();
  }

  public async close(): Promise<void> {
    await this.client.close();
  }

  public database(name: string): Db {
    return this.client.db(name);
  }

  public collection(name: string): Collection {
    return this.database(this.config.name).collection(name);
  }

  public async create(doc: Document, options?: InsertOneOptions): Promise<IResponseCreate> {
    const response = await this.collection("a").insertOne(doc, options ?? {});
    return {
      _id: response.insertedId.toString(),
    };
  }

  public async createMany(docs: Array<Document>, options?: BulkWriteOptions): Promise<IResponseCreateMany> {
    const response = await this.collection("a").insertMany(docs, options ?? {});
    return {
      count: response.insertedCount,
      data: ["1"],
    };
  }

  public async read(filter: Filter<Document>, options?: FindOptions): Promise<unknown> {
    return await this.collection("a").findOne(filter, options ?? {});
  }

  public async readAll(filter: Filter<Document>, options?: FindOptions): Promise<unknown> {
    return await this.collection("a")
      .find(filter, options ?? {})
      .toArray();
  }

  public async update(filter: Filter<Document>, document: Document, options?: UpdateOptions): Promise<unknown> {
    return await this.collection("a").updateOne(filter, document, options ?? {});
  }

  public async updateMany(filter: Filter<Document>, document: Document, options?: UpdateOptions): Promise<unknown> {
    return await this.collection("a").updateMany(filter, document, options ?? {});
  }

  public async delete(filter: Filter<Document>, options?: DeleteOptions): Promise<unknown> {
    return await this.collection("a").deleteOne(filter, options ?? {});
  }

  public async deleteMany(filter: Filter<Document>, options?: DeleteOptions): Promise<unknown> {
    return await this.collection("a").deleteMany(filter, options ?? {});
  }

  public async aggregate(filter: Array<Document>, options?: AggregateOptions): Promise<unknown> {
    return await this.collection("a")
      .aggregate(filter, options ?? {})
      .toArray();
  }
}
