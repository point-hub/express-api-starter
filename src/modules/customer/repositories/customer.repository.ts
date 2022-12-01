import { BaseRepository } from "@src/database/base-repository.js";
import DatabaseConnection, {
  CreateOptionsInterface,
  DeleteOptionsInterface,
  DocumentInterface,
  QueryInterface,
  ReadManyOptionsInterface,
  ReadOptionsInterface,
  UpdateOptionsInterface,
  CreateResultInterface,
  ReadResultInterface,
  ReadManyResultInterface,
  UpdateResultInterface,
  DeleteResultInterface,
} from "@src/database/connection.js";

export class CustomerRepository extends BaseRepository {
  constructor(db: DatabaseConnection) {
    super(db, "customer");
  }

  public async create(doc: DocumentInterface, options?: CreateOptionsInterface): Promise<CreateResultInterface> {
    return await this.collection().create(doc, options);
  }

  public async read(id: string, options?: ReadOptionsInterface): Promise<ReadResultInterface> {
    return await this.collection().read(id, options);
  }

  public async readMany(query: QueryInterface, options?: ReadManyOptionsInterface): Promise<ReadManyResultInterface> {
    return await this.collection().readMany(query, options);
  }

  public async update(
    id: string,
    document: DocumentInterface,
    options?: UpdateOptionsInterface
  ): Promise<UpdateResultInterface> {
    return await this.collection().update(id, document, options);
  }

  public async delete(id: string, options?: DeleteOptionsInterface): Promise<DeleteResultInterface> {
    return await this.collection().delete(id, options);
  }
}
