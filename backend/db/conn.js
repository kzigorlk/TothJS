const mongoose = require("mongoose");

async function main() {
  await mongoose.connect("mongodb://localhost:27017/Toth");
  console.log("Mongoose Connect Successful ✔");
}

main().catch((err) => console.log(err));

module.exports = mongoose;
