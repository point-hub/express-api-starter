// import { UserEntity } from "../entities/user.entity.js";

export interface IAdapter {
  userDb(): void;
}

export class UserService {
  public adapter: IAdapter;
  constructor(adapter: IAdapter) {
    this.adapter = adapter;
  }

  create() {
    //
  }

  createMany() {
    //
  }

  readMany() {
    //
  }

  readOne() {
    //
  }

  update() {
    //
  }

  updateMany() {
    //
  }

  destroyOne() {
    //
  }

  destroyMany() {
    //
  }
}