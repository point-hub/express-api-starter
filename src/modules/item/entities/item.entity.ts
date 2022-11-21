export interface IItem {
  name: string;
  address: string;
  phone: string;
  archived?: boolean;
}

export const restricted = [];

export class ItemEntity {
  public item: IItem;

  constructor(item: IItem) {
    this.item = item;
  }
}
