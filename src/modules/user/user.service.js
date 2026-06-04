const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AppError = require("../../errors/AppError");
const userRepository = require("./user.repository");

const SALT_ROUNDS = 10;

const signToken = (user) =>
  jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

const stripPassword = (user) => {
  const { password_hash, ...safeUser } = user;
  return safeUser;
};

const registerUser = async ({ username, email, password }) => {
  //revisar si ya existe ese usuario
  const isMailRegistered = await userRepository.findByEmail(email);
  const isUsernameRegistered = await userRepository.findByUsername(username);
  if (isMailRegistered) throw new AppError(409, "Email already registered");
  if (isUsernameRegistered)
    throw new AppError(409, "Username already taken, please choose another");
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const userData = { email, username, passwordHash };
  const user = await userRepository.createUser(userData);
  const token = signToken(user);

  return { token, userId: user.id, username: user.username };
};

const loginUser = async ({ username, password }) => {
  //revisar si existe el usuario
  const user = await userRepository.findByUsername(username);
  if (!user) throw new AppError(401, "Invalid credentials");
  //checkear si la contraseña es correcta
  const validPassword = await bcrypt.compare(password, user.password_hash);
  if (!validPassword) throw new AppError(401, "Invalid credentials");
  //generar token

  const token = signToken(user);

  return {
    token,
    userId: user.id,
    username: user.username,
  };
  //devolver token, userId y username
};

const getMe = async (id) => {
  const user = await userRepository.findById(id);
  return stripPassword(user);
};

const updateMe = async (userId, data) => {
  const { username, email } = data;
  const { password, ...newData } = data;
  if (email) {
    const existing = await userRepository.findByEmail(email);
    if (existing && existing.id !== userId) {
      throw new AppError(409, "Email already in use");
    }
  }
  if (username) {
    const existing = await userRepository.findByUsername(username);
    if (existing && existing.id !== userId) {
      throw new AppError(409, "Username already in use");
    }
  }
  if (password) {
    const user = await userRepository.findById(userId);
    const isCurrentPassword = await bcrypt.compare(
      password,
      user.password_hash,
    );
    if (isCurrentPassword) throw new AppError(409, "Password is the same");
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    newData.password_hash = passwordHash;
  }
  const updatedUser = await userRepository.updateUser(userId, newData);
  return stripPassword(updatedUser);
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateMe,
};
