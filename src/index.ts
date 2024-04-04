import * as env from "./core/env";
import * as server from "./server";

env.EnvInit();

console.log("PoppyDB is starting...");

server.ServerStart();
