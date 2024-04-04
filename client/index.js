const net = require("net");

const port = 3779;
const hostname = "127.0.0.1";

const socket = new net.Socket();

socket.connect(port, hostname, () => {
  socket.write(
    JSON.stringify({
      collection: "blocks",
      dbName: 'PoppyDB',
      insertOne: {
        body: "Hello World!",
      },
    })
  );
  socket.on("data", (data) => {
    console.log(String(data));
  });
});
