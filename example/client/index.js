const net = require("net");

async function run() {
  const port = 3939;
  const hostname = "127.0.0.1";

  const socket = new net.Socket();

  socket.connect(port, hostname, async () => {
    const { insertedId } = await insertOne(socket, {
      collection: "blocks",
      data: {
        body: "Hello World!",
      },
    });

    await updateOne(socket, {
      collection: "blocks",
      filter: {
        _id: insertedId
      },
      data: {
        body: "Goodbye World!"
      }
    })

    const note = await findOne(socket, {
      collection: "blocks",
      filter: {
        _id: insertedId,
      },
    });

    console.log(note);
  });
}

function insertOne(socket, { collection, data }) {
  return new Promise((resolve) => {
    socket.once("data", (data) => {
      resolve(JSON.parse(String(data)));
    });

    socket.write(
      JSON.stringify({
        collection,
        insertOne: data,
      })
    );
  });
}

function findOne(socket, { collection, filter }) {
  return new Promise((resolve) => {
    socket.once("data", (data) => {
      resolve(JSON.parse(String(data)));
    });

    socket.write(
      JSON.stringify({
        collection,
        findOne: {
          filter,
        },
      })
    );
  });
}

function updateOne(socket, { collection, filter, data }) {
  return new Promise((resolve) => {
    socket.once("data", () => {
      resolve();
    });

    socket.write(
      JSON.stringify({
        collection,
        updateOne: {
          filter,
          data
        },
      })
    );
  });
}

run();