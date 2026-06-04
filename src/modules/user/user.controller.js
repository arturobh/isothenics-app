const userService = require("./user.service");

const registerUser = async (req, res, next) => {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const logedUser = await userService.loginUser(req.body);
    res.status(200).json(logedUser);
  } catch (err) {
    next(err);
  }
};

const getMe = async (req, res, next) => {
  try {
    const { id } = req.user;
    const userData = await userService.getMe(id);
    res.status(200).json(userData);
  } catch (err) {
    next(err);
  }
};

const updateMe = async (req, res, next) => {
  try {
    const { id } = req.user;
    const updatedUser = await userService.updateMe(id, req.body);
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateMe,
};
