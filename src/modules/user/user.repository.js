const { prisma } = require("../../config/db");

const findByEmail = async (email) => {
  return prisma.user.findUnique({
    where: { email: email },
  });
};

const findByUsername = async (username) => {
  return prisma.user.findUnique({
    where: { username: username },
  });
};

const findById = async (id) => {
  return prisma.user.findUnique({
    where: { id: id },
  });
};

const createUser = async ({ email, username, passwordHash }) => {
  return await prisma.user.create({
    data: {
      email,
      username,
      password_hash: passwordHash,
    },
  });
};

const updateUser = async (id, data) => {
  return prisma.user.update({
    where: { id },
    data,
  });
};

module.exports = {
  findByEmail,
  findByUsername,
  findById,
  createUser,
  updateUser,
};
