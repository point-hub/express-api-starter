export interface IUser {
  username: string;
  password: string;
  email: string;
  fullName: string;
  status?: "registered" | "activated" | "suspended";
}

export const restricted = ["status"];

export class UserEntity {
  public user: IUser;

  constructor(user: IUser) {
    this.user = user;
  }

  public generateRandomPassword() {
    this.user.password = "<random generated password>";
  }

  public suspendUser() {
    this.user.status = "suspended";
  }

  public activateUser() {
    this.user.status = "activated";
  }
}
