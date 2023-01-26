"use strict";

const crypto = require("crypto");
const bcrypt = require("bcryptjs");

exports.encrypt = (password) => {
  const salt = bcrypt.genSaltSync(10);
  // Hash Password
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};
