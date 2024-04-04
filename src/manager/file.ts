import fs from "fs";
import { getCollection } from "./collections";

//* TODO: init manager should include something like this
// const dbFolderName = 'db'

// try {
//   fs.statSync(dbFolderName)
// } catch(err) {
//   fs.mkdirSync(dbFolderName)
// }

// const filenames = fs.readdirSync(dbFolderName);
// for (const filename of filenames) {
//   const collectionName = filename.split('.')[0]
//   const collectionFileContents = fs.readFileSync(`${dbFolderName}/${filename}`);
//   if (collectionFileContents) {
//     collections[collectionName] = JSON.parse(collectionFileContents)
//   }
// }

export function saveToFile(dbName: string, collectionName: string) {
  fs.mkdirSync(`${dbName}`, { recursive: true });

  fs.writeFileSync(
    `${dbName}/${collectionName}.json`,
    JSON.stringify(getCollection(collectionName))
  );
}
