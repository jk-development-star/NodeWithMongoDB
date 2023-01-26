"use strict";

const userSchema = require("../../models/users/users.model");

exports.createUser = async (data) => {
  const newUser = await userSchema.create(data);
  const { password, __v, ...result } = newUser._doc;
  return result;
};

exports.findUserEmail = async (data) => {
  const user = await userSchema.findOne({ email: data });
  return user;
};

exports.getAllUsers = async (page, limit = 10) => {
  const users = await userSchema
    .find()
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .select(["-password", "-__v"])
    .exec();
  //Count All Users
  const count = await userSchema.count();
  return {
    users,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  };
};
