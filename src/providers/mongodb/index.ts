import { MongoClient, MongoClientOptions } from "mongodb";

interface IDatabaseConfig {
  protocol: string;
  host: string;
  name: string;
  username?: string;
  password?: string;
}

export default class MongoDb {
  public client: MongoClient;
  private config: IDatabaseConfig;

  constructor(config: IDatabaseConfig) {
    const options: MongoClientOptions = {};

    this.config = config;

    this.client = new MongoClient(this.connectionURI(), options);
  }

  private connectionURI() {
    // let uri = "";

    // if (config.username && config.password) {
    //   uri = `${config.protocol}://${config.username}:${config.password}@${config.host}/?w=majority`;
    // }
    return "mongodb://localhost:27017";
  }

  public async open() {
    await this.client.connect();
  }

  public async close() {
    await this.client.close();
  }

  public database() {
    return this.client.db(this.config.name);
  }

  public collection(name: string) {
    return this.database().collection(name);
  }
}
