import { Collection } from "mongodb";

export interface RepositoryBridge {
  collection: Collection;
  create(): Promise<void>;
  createMany(): Promise<void>;
  readMany(): Promise<void>;
  readOne(): Promise<void>;
  updateOne(): Promise<void>;
  updateMany(): Promise<void>;
  deleteOne(): Promise<void>;
  deleteMany(): Promise<void>;
}
