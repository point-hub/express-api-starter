export interface IUser {
  username: string;
  password: string;
  email: string;
  fullName: string;
  emailValidationCode?: string;
  status?: "registered" | "activated" | "suspended";
}

export const restricted = ["status"];

export class UserEntity {
  public user: IUser;

  constructor(user: IUser) {
    this.user = user;
  }

  public generateEmailValidationCode() {
    this.user.emailValidationCode = "<random generated code>";
  }

  public generateRandomPassword() {
    this.user.password = "<random generated password>";
  }

  public suspendUser() {
    this.user.status = "suspended";
  }
}
