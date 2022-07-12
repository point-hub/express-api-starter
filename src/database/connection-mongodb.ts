import { MongoClient, MongoClientOptions, Filter, FindOptions, Document } from "mongodb";
import { IDatabaseAdapter } from "./connection.js";

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

  public url() {
    return "mongodb://localhost:27017";
  }

  public async open() {
    await this.client.connect();
  }

  public async close() {
    await this.client.close();
  }

  public database(name: string) {
    return this.client.db(name);
  }

  public collection(name: string) {
    return this.database(this.config.name).collection(name);
  }

  public async create(doc: Document): Promise<unknown> {
    return await this.collection("a").insertOne(doc);
  }

  public async createMany(docs: Array<Document>): Promise<unknown> {
    return await this.collection("a").insertMany(docs);
  }

  public async read(filter: Filter<Document>, options: FindOptions): Promise<unknown> {
    return await this.collection("a").findOne(filter, options);
  }

  public async readAll(filter: Filter<Document>): Promise<unknown> {
    return await this.collection("a").find(filter).toArray();
  }

  public async update(filter: Filter<Document>, document: Document): Promise<unknown> {
    return await this.collection("a").updateOne(filter, document);
  }

  public async updateMany(filter: Filter<Document>, document: Document): Promise<unknown> {
    return await this.collection("a").updateMany(filter, document);
  }

  public async delete(filter: Filter<Document>): Promise<unknown> {
    return await this.collection("a").deleteOne(filter);
  }

  public async deleteMany(filter: Filter<Document>): Promise<unknown> {
    return await this.collection("a").deleteMany(filter);
  }

  public async aggregate(filter: Array<Document>): Promise<unknown> {
    return await this.collection("a").aggregate(filter).toArray();
  }
}
