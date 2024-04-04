import { getCollection } from "./collections";
import { saveToFile } from "./file";

export * from "./collections";
export * from "./file";

export function manageData(jsonData: any): string {
  const collection = getCollection(jsonData.collection);
  let response = "1";

  if (jsonData.insertOne) {
    const _id = new Date().getTime();

    collection[_id] = { ...jsonData.insertOne, _id };

    saveToFile(jsonData.dbName, jsonData.collection);
    response = JSON.stringify({ insertedId: _id });
  }

  return response;
}
