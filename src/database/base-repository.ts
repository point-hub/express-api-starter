import DatabaseConnection, {
  DocumentInterface,
  QueryInterface,
  CreateResultInterface,
  ReadResultInterface,
  ReadManyResultInterface,
  UpdateResultInterface,
  DeleteResultInterface,
  CreateOptionsInterface,
  ReadOptionsInterface,
  ReadManyOptionsInterface,
  UpdateOptionsInterface,
  DeleteOptionsInterface,
} from "./connection.js";

export abstract class BaseRepository {
  public db: DatabaseConnection;
  public name: string;

  constructor(db: DatabaseConnection, name: string) {
    this.db = db;
    this.name = name;
  }

  collection() {
    return this.db.collection(this.name);
  }

  abstract create(doc: DocumentInterface, options?: CreateOptionsInterface): Promise<CreateResultInterface>;
  abstract read(id: string, options?: ReadOptionsInterface): Promise<ReadResultInterface>;
  abstract readMany(query: QueryInterface, options?: ReadManyOptionsInterface): Promise<ReadManyResultInterface>;
  abstract update(id: string, doc: DocumentInterface, options?: UpdateOptionsInterface): Promise<UpdateResultInterface>;
  abstract delete(id: string, options?: DeleteOptionsInterface): Promise<DeleteResultInterface>;
}
