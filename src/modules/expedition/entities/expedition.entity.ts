export interface IExpedition {
  name: string;
  address: string;
  phone: string;
  archived?: boolean;
}

export const restricted = [];

export class ExpeditionEntity {
  public expedition: IExpedition;

  constructor(expedition: IExpedition) {
    this.expedition = expedition;
  }
}
