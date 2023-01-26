const mongoose = require("../db/conn");
const { Schema } = mongoose;

const { CDDSchema } = require("./Cdd");

const book = mongoose.model(
  "book",
  new Schema(
    {
      id_tombo: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      subtitle: {
        type: String,
      },
      cover: {
        type: String,
      },
      authors: {
        type: Array,
        required: true,
      },
      ISBN: {
        type: String,
        required: true,
      },
      cod_classfication: {
        type: String,
      },
      CDD: Object,
    },
    { timestamps: true }
  )
);

module.exports = book;
