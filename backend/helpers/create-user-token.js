const jwt = require("jsonwebtoken");

const createUserToken = async (user, req, res) => {
  //create a token "oursecret" is a secret word
  const token = jwt.sign(
    {
      name: user.name,
      id: user._id,
    },
    "oursecret"
  );
  // return token
  res.status(200).json({
    message: "You are authenticated",
    token: token,
    userId: user._id,
  });
};

module.exports = createUserToken;
