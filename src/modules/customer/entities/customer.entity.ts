export interface ICustomer {
  name: string;
  address: string;
  phone: string;
  archived?: boolean;
}

export const restricted = [];

export class CustomerEntity {
  public customer: ICustomer;

  constructor(customer: ICustomer) {
    this.customer = customer;
  }
}
