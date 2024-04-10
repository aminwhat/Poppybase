import { PoppyCache } from "../cache";
import { PoppyMongoClient } from "../db";

export class PoppyManager {
  /**
   * Don't forget to call `init()`
   *
   * also `dispose()`
   */
  constructor(private db: PoppyMongoClient, private cache: PoppyCache) {}

  async init() {
    await this.cache.init();
    const err = await this.db.connect();
    if (err) {
      console.log(err);
      throw err;
    }
  }

  async dispose() {
    await this.db.disconnect();
    await this.cache.destroy();
  }
}
