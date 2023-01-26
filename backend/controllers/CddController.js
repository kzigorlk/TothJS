const Cdd = require("../models/Cdd");

module.exports = class CddController {
  static async create(req, res) {
    const { number, classification } = req.body;

    if (!number) {
      res.status(422).json({ message: "O nome é obrigatório" });
    }
    if (!classification) {
      res.status(422).json({ message: "A classificação é obrigatório" });
    }
    const cdd = new Cdd({
      number: number,
      classification: classification,
    });

    const cddExists = await Cdd.findOne({ number: number });

    if (cddExists) {
      res.status(422).json({
        message: "Já existe este CDD",
      });
      return;
    }

    try {
      const newCdd = await cdd.save();
      res.status(201).json({
        message: "CDD cadastrado com sucesso",
        newCdd,
      });
    } catch (error) {
      res.status(500).json({ meesage: error });
    }
  }

  static async getCddByNumber(req, res) {
    const number = req.params.number;
    const cdd = await Cdd.findOne({ number: number });

    if (!cdd) {
      res.status(402).json({
        message: "CDD não encontrado",
      });
      return;
    }
    res.status(200).json({ cdd });
  }
};
