//Minha primeira gambiarra em node :)

const Cdd = require("../models/Cdd");

const getCddByNumber = async (cddNumber) => {
  return await Cdd.findOne({ number: cddNumber });
};

module.exports = getCddByNumber;
