import { config } from "dotenv";

config();

export interface IMongodbConfig {
  driver: "mongodb";
  protocol: string;
  url?: string;
  host: string;
  port: number;
  name: string;
  username?: string;
  password?: string;
}

export interface IDatabaseConfig {
  default: string;
  mongodb: IMongodbConfig;
  [key: string]: unknown;
}

export const connection: IDatabaseConfig = {
  default: "mongodb",
  mongodb: {
    driver: "mongodb",
    protocol: "mongodb",
    url: "mongodb://localhost:27017",
    host: "localhost",
    port: 27017,
    name: "starter",
    username: "",
    password: "",
  },
};
