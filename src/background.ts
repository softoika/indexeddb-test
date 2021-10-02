import { connect } from "./db";

console.log("background works!");

connect()
  .then(() => {
    console.log("db success");
  })
  .catch((event) => {
    console.log("db error", event);
  });
