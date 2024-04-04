import * as env from "../core/env";
import * as manager from "../manager";
import net from "net";

export function ServerStart() {
  const server = net.createServer();

  try {
    const port = Number(env.getPort());
    server.listen(port, () => {
      console.log(`PoppyDB is listening on port: ${port}`);
    });
  } catch (error) {
    console.log("Error starting PoppyDB server: ", error);
    throw error;
  }

  server.on("connection", (sock) => {
    sock.on("data", (data) => {
      const jsonData = JSON.parse(data.toString());

      const response = manager.manageData(jsonData);

      sock.write(response);
    });
  });
}
