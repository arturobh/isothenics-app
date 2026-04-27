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

const findElementById = async (elementId) => {};

const findAllProgressions = async () => {
  return prisma.progression.findMany();
};

const findProgressionsByElementId = async (elementId) => {
  return prisma.element_progression.findMany({
    where: { element_id: elementId },
    include: {
      progression: true,
      element: {
        select: {
          name: true,
          description: true,
        },
      },
    },
  });
};

module.exports = {
  findAllMovements,
  findMovementById,
  findAllElements,
  findElementById,
  findAllProgressions,
  findProgressionsByElementId,
};
