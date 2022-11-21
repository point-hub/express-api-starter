export interface IRole {
  name: string;
  address: string;
  phone: string;
  archived?: boolean;
}

export const restricted = [];

export class RoleEntity {
  public role: IRole;

  constructor(role: IRole) {
    this.role = role;
  }
}
