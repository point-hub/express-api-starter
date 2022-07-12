import { Collection, Document, Filter } from "mongodb";
import { IUser } from "../entities/user.entity.js";
import DatabaseConnection from "@src/database/connection.js";

export class UserRepository {
  collection: Collection;

  constructor(db: DatabaseConnection) {
    const name = "user";
    this.collection = db.collection(name) as Collection;
  }

  async create(user: Partial<IUser>) {
    await this.collection.insertOne(user);
  }

  async createMany(users: Array<Partial<IUser>>) {
    await this.collection.insertMany(users);
  }

  async readAll(filter: Filter<Document>) {
    await this.collection.find(filter).toArray();
  }

  async readOne(filter: Filter<Document>) {
    await this.collection.findOne(filter);
  }

  async update(filter: Filter<Document>, document: Document) {
    await this.collection.updateOne(filter, document);
  }

  async updateMany(filter: Filter<Document>, document: Document) {
    await this.collection.updateMany(filter, document);
  }

  async destroyOne(filter: Filter<Document>) {
    await this.collection.deleteOne(filter);
  }

  async destroyMany(filter: Filter<Document>) {
    await this.collection.deleteMany(filter);
  }

  async aggregate(filter: Array<Document>) {
    await this.collection.aggregate(filter).toArray();
  }
}
