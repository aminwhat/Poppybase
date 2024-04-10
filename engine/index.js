const rust_neon = require(".");

function hello() {
  return rust_neon.hello();
}

console.log(hello());
