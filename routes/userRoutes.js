const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController")
const verifyJWT = require("../middlewares/verifyJWT")




router.use(verifyJWT);
router.route("").get(userController.getAllUsers);
router.route("/:id").put(userController.updateUser);
router.route("/:id").delete(userController.deleteUser);
router.route("/search").get(userController.findUser);

module.exports = router;