import { CustomerRepository } from "../repositories/customer.repository.js";
import DatabaseConnection, { QueryInterface } from "@src/database/connection.js";

export class ReadManyCustomerService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(query: QueryInterface) {
    const customerRepository = new CustomerRepository(this.db);
    return await customerRepository.readMany(query);
  }
}
