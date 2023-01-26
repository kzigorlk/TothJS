const Book = require("../models/Book");

const getCddByNumber = require("../helpers/get-cdd-by-number");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = class BookController {
  static async create(req, res) {
    const {
      id_tombo,
      title,
      subtitle,
      cover,
      authors,
      ISBN,
      cod_classfication,
      CDD,
    } = req.body;

    if (!id_tombo) {
      res.status(422).json({ message: "O código do tombo é obrigatório" });
      return;
    }
    if (!title) {
      res.status(422).json({ message: "O titulo é obrigatório" });
      return;
    }
    if (!authors) {
      res.status(422).json({ message: "Pelo menos um autor é obrigatório" });
      return;
    }
    if (!ISBN) {
      res.status(422).json({ message: "O ISBN é obrigatório" });
      return;
    }
    if (!CDD) {
      res.status(422).json({ message: "O CDD é obrigatório" });
      return;
    }

    //get CDD

    const cdd = await getCddByNumber(CDD);

    const book = new Book({
      id_tombo,
      title,
      subtitle,
      cover,
      authors: authors,
      ISBN,
      cod_classfication,
      CDD: {
        number: cdd.number,
        classification: cdd.classification,
      },
    });
    try {
      const newBook = await book.save();
      res.status(201).json({
        message: "Livros cadastrado",
        newBook,
      });
    } catch (error) {
      req.status(500).json({ message: error });
    }
  }

  static async getAll(req, res) {
    const books = await Book.find().sort("-createdAt");

    res.status(200).json({
      books: books,
    });
  }

  static async getBookById(req, res) {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "ID invalido" });
      return;
    }

    const book = await Book.findOne({ _id: id });
    if (!book) {
      res.status(404).json({ message: "Livro não encontrado" });
      return;
    }

    res.status(200).json({
      book: book,
    });
  }

  static async removeBookById(req, res) {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "ID invalido" });
      return;
    }

    await Book.findByIdAndRemove(id);

    res.status(200).json({ message: "Livro removido com sucesso" });
    return;
  }

  static async updateBook(req, res) {
    const id = req.params.id;

    const {
      id_tombo,
      title,
      subtitle,
      cover,
      authors,
      ISBN,
      cod_classfication,
      CDD,
    } = req.body;

    const updatedData = {};

    const book = await Book.findOne({ _id: id });
    if (!book) {
      res.status(404).json({ message: "Livro não encontrado" });
      return;
    }

    if (!id_tombo) {
      res.status(422).json({ message: "O código do tombo é obrigatório" });
      return;
    } else {
      updatedData.id_tombo = id_tombo;
    }

    if (!title) {
      res.status(422).json({ message: "O titulo é obrigatório" });
      return;
    } else {
      updatedData.title = title;
    }

    if (!authors) {
      res.status(422).json({ message: "Pelo menos um autor é obrigatório" });
      return;
    } else {
      updatedData.authors = authors;
    }

    if (!ISBN) {
      res.status(422).json({ message: "O ISBN é obrigatório" });
      return;
    } else {
      updatedData.ISBN = ISBN;
    }

    if (!CDD) {
      res.status(422).json({ message: "O CDD é obrigatório" });
      return;
    } else {
      updatedData.CDD = CDD;
    }
    if (subtitle) {
      updatedData.subtitle = subtitle;
    }
    if (cod_classfication) {
      updatedData.cod_classfication = cod_classfication;
    }

    await Book.findByIdAndUpdate(id, updatedData);

    res.status(200).json({ message: "livro atualizado com sucesso" });
  }
};
