import mongoose from "mongoose";

export type PoppyMongoClientOptions = {
  uri: string;
  dbOptions: mongoose.ConnectOptions;
  collections: string[] | "*";
};

export class PoppyMongoClient {
  private dbClient!: typeof mongoose;

  /**
   * Don't forget to call `connect()`
   * & `disconnect()`
   */
  constructor(private options: PoppyMongoClientOptions) {
    if (!options.collections || options.collections.length === 0) {
      options.collections = "*";
    }
  }

  async connect() {
    let err: any;
    await mongoose
      .connect(this.options.uri, this.options.dbOptions)
      .then((conn) => {
        this.dbClient = conn;
      })
      .catch((reason) => {
        err = reason;
      });

    if (err) {
      return err;
    }
  }

  async disconnect() {
    await this.dbClient.disconnect();
  }
}
