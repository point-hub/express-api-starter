import { CustomerRepository } from "../repositories/customer.repository.js";
import DatabaseConnection, { IFilter } from "@src/database/connection.js";

export class ReadCustomerService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(id: string) {
    const customerRepository = new CustomerRepository(this.db);
    return await customerRepository.read(id);
  }
}
