require("dotenv").config();
import fs from "fs";

export function EnvInit() {
  if (!fs.existsSync(".env")) {
    fs.writeFileSync(".env", `PORT=3779\nPASSWORD=toor\n`);
    return;
  }

  if (!process.env.PORT) {
    fs.appendFileSync(".env", `PORT=3779\n`);
  }

  if (!process.env.PASSWORD) {
    fs.appendFileSync(".env", `PASSWORD=toor\n`);
  }
}

export function getPort(): string {
  return process.env.PORT ?? "3779";
}

export function getPASSWORD(): string {
  return process.env.PASSWORD ?? "toor";
}
