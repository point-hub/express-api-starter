import { CustomerRepository } from "../repositories/customer.repository.js";
import DatabaseConnection, { IQuery } from "@src/database/connection.js";

export class ReadManyCustomerService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(query: IQuery) {
    const customerRepository = new CustomerRepository(this.db);
    return await customerRepository.readMany(query);
  }
}
