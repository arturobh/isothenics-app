const AppError = require("../../errors/AppError");
const catalogRepository = require("./catalog.repository");

const getAllMovements = async () => {};
const getMovementById = async (id) => {};
const getAllElements = async () => {};
const getElementById = async (id) => {};
const getAllProgressions = async () => {};
const getProgressionsByElementId = async (id) => {
  const progressions = await catalogRepository.findProgressionsByElementId(id);
  console.log(progressions);
  if (progressions.length === 0)
    throw new AppError(404, "Progressions not found for that element id");
  return progressions;
};

module.exports = {
  getAllMovements,
  getMovementById,
  getAllElements,
  getElementById,
  getAllProgressions,
  getProgressionsByElementId,
};
