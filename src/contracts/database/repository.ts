import { Collection } from "mongodb";

export interface RepositoryBridge {
  collection: Collection;
  create(): Promise<void>;
  readMany(): Promise<void>;
  readOne(): Promise<void>;
  updateOne(): Promise<void>;
  deleteOne(): Promise<void>;
}
