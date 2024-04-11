import {
  createRxDatabase,
  JsonSchemaTypes,
  RxCollectionCreator,
  RxDatabase,
  TopLevelProperty,
} from "rxdb";
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

  /**
   * Give it a json sample of the database data and it will build it in the client
   */
  async collectionInit(colls: { [name: string]: any }) {
    const collections: {
      [x: string]: RxCollectionCreator<any>;
    } = {};

    Object.keys(colls).map((name) => {
      collections[name] = convertObjToCollection(colls[name]);
    });

    await this.cache.addCollections(collections);
  }

  async destroy() {
    await this.cache.remove();
  }
}

function convertObjToType(obj: any): JsonSchemaTypes {
  let type: JsonSchemaTypes = "null";

  switch (typeof obj) {
    case "bigint":
      type = "integer";
      break;
    case "boolean":
      type = "boolean";
      break;
    case "number":
      type = "number";
      break;
    case "string":
      type = "string";
      break;
    default:
      type = "array";
      break;
  }

  return type;
}

function convertObjToCollectionPart(obj: any): {
  [x: string]: TopLevelProperty;
} {
  const result: { [x: string]: TopLevelProperty } = {};

  Object.keys(obj).map((val) => {
    if (typeof obj[val] === "object") {
      result[val] = convertObjToCollectionPart(obj[val]);
    } else {
      result[val] = { type: convertObjToType(obj[val]) };
    }
  });

  return result;
}

function convertObjToCollection(obj: any): RxCollectionCreator {
  let primaryKey = "id";
  let version = 0;
  let properties: { [x: string]: TopLevelProperty } = {};

  if (obj._id) {
    primaryKey = "_id";
  }

  if (obj.__v) {
    try {
      version = Number(obj.__v);
    } catch (error) {
      console.log(`Error Converting __v: ${error}`);
    }
  }

  Object.keys(obj).map((val) => {
    if (typeof obj[val] === "object") {
      properties[val] = convertObjToCollectionPart(obj[val]);
    } else {
      properties[val] = { type: convertObjToType(obj[val]) };
    }
  });

  return {
    schema: {
      primaryKey,
      version: version,
      type: "object",
      properties,
    },
  };
}
