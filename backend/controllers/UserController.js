const User = require("../models/User");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

//Helpers
const createUserToken = require("../helpers/create-user-token");
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");

module.exports = class UserController {
  static async register(req, res) {
    const { name, password, confirmpassword } = req.body;

    //Validations
    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório" });
      return;
    }
    if (!password) {
      res.status(422).json({ message: "A senha é obrigatório" });
      return;
    }
    if (!confirmpassword) {
      res.status(422).json({ message: "A confirmação de senha é obrigatório" });
      return;
    }
    if (password !== confirmpassword) {
      res.status(422).json({
        message: "A senha e a confirmação de senha precisão ser iguais",
      });
      return;
    }

    //Check if user exists
    const userExists = await User.findOne({ name: name });

    if (userExists) {
      res.status(422).json({
        message: "Já existe um usuário com esse nome",
      });
      return;
    }

    //Create a password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    //Create a user
    const user = new User({
      name: name,
      password: passwordHash,
    });

    try {
      const newUser = await user.save();

      await createUserToken(newUser, req, res);

      return;
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async login(req, res) {
    const { name, password } = req.body;
    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório" });
      return;
    }
    if (!password) {
      res.status(422).json({ message: "A senha é obrigatório" });
      return;
    }
    //Check if user exists
    const user = await User.findOne({ name: name });

    if (!user) {
      res.status(422).json({
        message: "Nome não foi encontrado",
      });
      return;
    }

    //check if password match with db password
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      res.status(422).json({
        message: "Senha invalida",
      });
      return;
    }

    await createUserToken(user, req, res);
  }

  //check if user and token is equal
  static async checkUser(req, res) {
    let currentUser;

    if (req.headers.authorization) {
      const token = getToken(req);
      const decoded = jwt.verify(token, "oursecret");

      currentUser = await User.findById(decoded.id);

      currentUser.password = undefined;
    } else {
      currentUser = null;
    }
    res.status(200).send(currentUser);
  }

  //Find user by hes id
  static async getUserById(req, res) {
    const id = req.params.id;
    const user = await User.findById(id).select("-password");

    if (!user) {
      res.status(402).json({
        message: "Usuário não encontrado",
      });
      return;
    }
    res.status(200).json({ user });
  }

  static async editUser(req, res) {
    // const id = req.params.id;

    const token = getToken(req);
    const user = await getUserByToken(token);

    let image = "";
    if (req.file) {
      user.image = req.file.filename;
    }

    const { name, password, confirmpassword } = req.body;

    //validations
    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório" });
      return;
    }
    user.name = name;

    // check if password match
    if (password != confirmpassword) {
      res.status(422).json({ error: "As senhas não conferem." });

      // change password
    } else if (password == confirmpassword && password != null) {
      // creating password
      const salt = await bcrypt.genSalt(12);
      const reqPassword = req.body.password;

      const passwordHash = await bcrypt.hash(reqPassword, salt);

      user.password = passwordHash;
    }
    try {
      // returns updated data
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $set: user },
        { new: true }
      );
      res.json({
        message: "Usuário atualizado com sucesso!",
        data: updatedUser,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
};
