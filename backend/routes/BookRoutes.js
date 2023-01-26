const router = require("express").Router();

const BookController = require("../controllers/BookCrontroller");

const { imageUpload } = require("../helpers/image-upload");

//middlewares
const verifyToken = require("../helpers/verify-token");

router.post("/create", verifyToken, BookController.create);
router.get("/", BookController.getAll);
router.get("/:id", BookController.getBookById);
router.delete("/:id", verifyToken, BookController.removeBookById);
router.patch(
  "/:id",
  verifyToken,
  imageUpload.single("image"),
  BookController.updateBook
);

module.exports = router;
