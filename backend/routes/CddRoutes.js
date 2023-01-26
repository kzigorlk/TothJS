const router = require("express").Router();

const BookController = require("../controllers/BookCrontroller");
const CddController = require("../controllers/CddController");

//middlewares
const verifyToken = require("../helpers/verify-token");

router.post("/create", verifyToken, CddController.create);
router.get("/:number", CddController.getCddByNumber);

module.exports = router;
