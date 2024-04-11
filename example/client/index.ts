import { PoppyDB } from "poppydb";

const db = new PoppyDB({ uri: "", dbOptions: {}, collections: "*" });
db.init();

db.cacheCollectionsInit();

db.dispose();
