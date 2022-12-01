import { CustomerEntity } from "../entities/customer.entity.js";
import { CustomerRepository } from "../repositories/customer.repository.js";
import DatabaseConnection, { DocumentInterface } from "@src/database/connection.js";

export class UpdateCustomerService {
  private db: DatabaseConnection;
  constructor(db: DatabaseConnection) {
    this.db = db;
  }
  public async handle(filter: any, doc: DocumentInterface, session: unknown) {
    const customerEntity = new CustomerEntity({
      name: doc.name,
      address: doc.address,
      phone: doc.phone,
    });

    const customerRepository = new CustomerRepository(this.db);
    return await customerRepository.update(filter, customerEntity.customer, { session });
  }
}
