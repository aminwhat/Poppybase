require("dotenv").config();
import mongoose, { Mongoose } from "mongoose";

declare const globalThis: {
  poppybaseConn: Mongoose;
} & typeof global;

const uri = process.env.MONGO_URI;

if (uri === undefined) {
  console.log("MONGO_URI is not defined");
  process.exit(1);
}

mongoose
  .connect(uri, {
    authSource: "admin",
    authMechanism: "DEFAULT",
    dbName: "poppybase",
  })
  .then((conn) => {
    console.log("Connected to MongoDB");
    globalThis.poppybaseConn = conn;
  });

export default mongoose;
