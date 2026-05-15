const AppError = require("../../errors/AppError");
const catalogRepository = require("./catalog.repository");

const getAllMovements = async () => {
  const movements = await catalogRepository.findAllMovements();
  return movements;
};

const getMovementById = async (id) => {
  const movement = await catalogRepository.findMovementById(id);
  if (!movement) throw new AppError(404, "No movement found for that id");
  return movement;
};

const getAllElements = async () => {
  const elements = await catalogRepository.findAllElements();
  return elements;
};

const getElementById = async (id, withProgressions) => {
  const element = withProgressions
    ? await catalogRepository.findElementByIdWithProgressions(id)
    : await catalogRepository.findElementById(id);
  if (!element) throw new AppError(404, "No element found for that id");
  return element;
};

const getAllProgressions = async () => {
  const progressions = await catalogRepository.findAllProgressions();
  return progressions;
};

module.exports = {
  getAllMovements,
  getMovementById,
  getAllElements,
  getElementById,
  getAllProgressions,
};
