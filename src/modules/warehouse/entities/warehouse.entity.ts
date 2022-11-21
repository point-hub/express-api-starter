export interface IWarehouse {
  name: string;
  address: string;
  phone: string;
  archived?: boolean;
}

export const restricted = [];

export class WarehouseEntity {
  public warehouse: IWarehouse;

  constructor(warehouse: IWarehouse) {
    this.warehouse = warehouse;
  }
}
