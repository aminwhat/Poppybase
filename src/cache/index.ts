import { createRxDatabase, RxDatabase } from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";

export class PoppyCache {
  private cache!: RxDatabase;

  /**
   * Don't forget to call `init()`
   *
   * also `destroy()`
   */
  constructor() {}

  async init() {
    this.cache = await createRxDatabase({
      name: "PoppyDB",
      storage: getRxStorageDexie(),
    });
  }

  async destroy() {
    await this.cache.remove();
  }
}
