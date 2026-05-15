const { prisma } = require("../../config/db");

const findAllMovements = async () => {
  return prisma.movement.findMany();
};

const findMovementById = async (movementId) => {
  return prisma.movement.findUnique({
    where: { id: movementId },
  });
};

const findAllElements = async () => {
  return prisma.element.findMany();
};

const findElementById = async (elementId) => {
  return prisma.element.findUnique({
    where: { id: elementId },
  });
};

const findElementByIdWithProgressions = async (elementId) => {
  return prisma.element.findUnique({
    where: { id: elementId },
    include: {
      element_progression: {
        include: {
          progression: {
            select: { name: true },
          },
        },
      },
    },
  });
};

const findAllProgressions = async () => {
  return prisma.progression.findMany();
};

module.exports = {
  findAllMovements,
  findMovementById,
  findAllElements,
  findElementById,
  findElementByIdWithProgressions,
  findAllProgressions,
};
