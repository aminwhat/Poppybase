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
  } else if (jsonData.findOne) {
    const filter = jsonData.findOne.filter;
    if (filter._id) {
      const data = collection[filter._id];

      response = JSON.stringify(data);
    }
  } else if (jsonData.updateOne) {
    const filter = jsonData.updateOne.filter;
    if (filter._id) {
      collection[filter._id] = {
        ...collection[filter._id],
        ...jsonData.updateOne.data,
      };

      saveToFile(jsonData.dbName, jsonData.collection);

      response = "0";
    }
  } else if (jsonData.deleteOne) {
    const filter = jsonData.deleteOne.filter;
    if (filter._id) {
      delete collection[filter._id];

      saveToFile(jsonData.dbName, jsonData.collection);

      response = "0";
    }
  }

  return response;
}
