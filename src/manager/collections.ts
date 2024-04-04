const collections = {};

export function getCollection(collectionName: string) {
  if (!collections[collectionName]) {
    collections[collectionName] = {};
  }
  return collections[collectionName];
}
