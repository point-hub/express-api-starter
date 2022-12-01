export interface RoleInterface extends CreateRoleInterface {
  _id: string;
}

export interface CreateRoleInterface {
  name: string;
}

export const restricted = [];

export class RoleEntity {
  public role: RoleInterface | CreateRoleInterface;

  constructor(role: RoleInterface | CreateRoleInterface) {
    this.role = role;
  }
}
