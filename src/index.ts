import { PoppyCache } from "./cache";
import { PoppyManager } from "./manager";
import { PoppyMongoClient, PoppyMongoClientOptions } from "./db";

export class PoppyDB {
  private cache: PoppyCache;
  private db: PoppyMongoClient;
  private manager: PoppyManager;

  /**
   * Don't forget to call `init()`
   *
   * also `dispose()`
   */
  constructor(dbOptions: PoppyMongoClientOptions) {
    this.cache = new PoppyCache();
    this.db = new PoppyMongoClient(dbOptions);
    this.manager = new PoppyManager(this.db, this.cache);
  }

  async init() {
    await this.manager.init();
  }

  async cacheCollectionsInit() {
    this.cache.collectionInit({});
  }

  async dispose() {
    await this.manager.dispose();
  }
}
