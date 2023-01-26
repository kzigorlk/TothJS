const mongoose = require("../db/conn");
const { Schema } = mongoose;

const Cdd = mongoose.model(
  "Cdd",
  new Schema(
    {
      number: {
        type: String,
        required: true,
      },
      classification: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  )
);

module.exports = Cdd;
