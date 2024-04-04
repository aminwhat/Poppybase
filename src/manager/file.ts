import fs from "fs";
import { getCollection } from "./collections";

export function saveToFile(dbName: string, collectionName: string) {
  fs.mkdirSync(`${dbName}`, { recursive: true });

  fs.writeFileSync(
    `${dbName}/${collectionName}.json`,
    JSON.stringify(getCollection(collectionName))
  );
}
