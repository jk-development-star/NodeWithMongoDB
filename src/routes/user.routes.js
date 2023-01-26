"use strict";

const router = require("express").Router();
const {
  createNewUser,
  getAllUser,
} = require("../controllers/users/user.controller");

router.post("/newUser", createNewUser);
router.get("/getAllUsers", getAllUser);

module.exports = router;
