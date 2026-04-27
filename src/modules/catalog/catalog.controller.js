const AppError = require("../../errors/AppError");
const catalogService = require("./catalog.service");

const getAllMovements = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
const getMovementById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.movementId);
    //Verifica si es NaN (parseInt retornó NaN si es que no pudo parsear a int)
    if (isNaN(id)) throw new AppError(400, "ID debe ser numérico");

    //derivar al service
  } catch (err) {
    next(err);
  }
};
const getAllElements = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
const getElementById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.elementId);
    //Verifica si es NaN (parseInt retornó NaN si es que no pudo parsear a int)
    if (isNaN(id)) throw new AppError(400, "ID debe ser numérico");

    //derivar al service
  } catch (err) {
    next(err);
  }
};
const getAllProgressions = async (req, res, next) => {
  try {
    res.status(200).json({ msg: "ok" });
  } catch (err) {
    next(err);
  }
};
const getProgressionsByElementId = async (req, res, next) => {
  try {
    const id = parseInt(req.params.elementId);
    //Verifica si es NaN (parseInt retornó NaN si es que no pudo parsear a int)
    if (isNaN(id)) throw new AppError(400, "ID debe ser numérico");

    //derivar al service
    const progressions = await catalogService.getProgressionsByElementId(id);
    res.status(200).json(progressions);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllMovements,
  getMovementById,
  getAllElements,
  getElementById,
  getAllProgressions,
  getProgressionsByElementId,
};
