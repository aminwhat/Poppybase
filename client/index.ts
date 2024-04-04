import net from "net";

const port = 3779;
const hostname = "127.0.0.1";

const socket = new net.Socket();

socket.connect(port, hostname, () => {
  socket.write("Hello World!");
  socket.on("data", (data) => {
    console.log(String(data));
  });
});
