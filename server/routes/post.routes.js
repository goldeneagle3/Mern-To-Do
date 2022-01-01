const express = require("express");

const router = express.Router();
const postCtrl = require("../controllers/post.controller.js");
const authenticateUser = require('../middleware/authentication.js');


router.route("/").post(authenticateUser,postCtrl.create).get(postCtrl.list);

router
  .route("/:id")
  .get(authenticateUser,postCtrl.read)
  .delete(authenticateUser,postCtrl.remove)
  .patch(authenticateUser,postCtrl.update);

module.exports = router;
