// client.js
const net = require("net");

async function run() {
  const port = 3779;
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

    console.log({ note });

    await deleteOne(socket, {
      collection: "blocks",
      filter: {
        _id: insertedId
      }
    })
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
        dbName: 'testdb',
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
        dbName: 'testdb',
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
        dbName: 'testdb',
        updateOne: {
          filter,
          data
        },
      })
    );
  });
}

function deleteOne(socket, { collection, filter }) {
  return new Promise((resolve) => {
    socket.once("data", () => {
      resolve();
    });

    socket.write(
      JSON.stringify({
        collection,
        dbName: 'testdb',
        deleteOne: {
          filter
        },
      })
    );
  });
}

run();