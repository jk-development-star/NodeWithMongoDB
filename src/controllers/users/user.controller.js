"use strict";

const bcryptPassword = require("../../helpers/bcrypt.password");
const userDriver = require("../../drivers/users/user.driver");
const { validateSignup } = require("../../validations/users/users.validation");
const responseCode = require("../../constants/responseCode.constant");
const { message } = require("../../constants");
const { userLogger } = require("../../utils/loggers");

const createNewUser = async (req, res) => {
  try {
    //check validations
    const { value, error } = validateSignup(req.body);
    if (error) {
      return res
        .status(400)
        .json(responseCode.code400(error.details[0].message));
    }
    //check duplicate email address
    const findDuplicateEmail = await userDriver.findUserEmail(value.email);
    if (findDuplicateEmail) {
      return res
        .status(400)
        .json(responseCode.code400(message.MESSAGE_DUPLICATE_USER));
    }
    ///hash user password
    const hashPass = await bcryptPassword.encrypt(value.password);
    var { password, ...data } = value;
    data["password"] = hashPass;
    //create new users
    const newUser = await userDriver.createUser(data);
    if (!newUser) {
      return res
        .status(400)
        .json(responseCode.code400(message.MESSAGE_ERROR_CREATING_USERS));
    } else {
      userLogger.info("User created!", {
        status: "201",
        user_id: `${newUser._id}`,
        user_name: `${newUser.first_name}`,
        user_email: `${newUser.email}`,
      });
      return res
        .status(201)
        .json(
          responseCode.code201(newUser, message.MESSAGE_SUCCESS_CREATE_USER)
        );
    }
  } catch (error) {
    userLogger.error("User not Created", { status: "500" });
    return res
      .status(500)
      .json(responseCode.code500(message.MESSAGE_INTERNAL_SERVER_ERROR));
  }
};

/**
 * Function to Get All User
 * @param {obj} req, res
 * @returns {json} obj
 */
const getAllUser = async (req, res) => {
  try {
    const { page, limit } = req.query;
    //Getting all users
    const users = await userDriver.getAllUsers(page, limit);
    if (!users) {
      return res
        .status(404)
        .json(responseCode.code404(message.MESSAGE_NO_USER_FOUND));
    }
    return res
      .status(200)
      .json(responseCode.code200(users, message.MESSAGE_SUCCESS_READ_USER));
  } catch (error) {
    //Logging the error
    userLogger.error("Error in getting Users", { status: "500" });
    return res
      .status(500)
      .json(responseCode.code500(message.MESSAGE_INTERNAL_SERVER_ERROR));
  }
};

module.exports = {
  createNewUser,
  getAllUser,
};
