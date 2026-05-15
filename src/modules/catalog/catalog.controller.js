const AppError = require("../../errors/AppError");
const catalogService = require("./catalog.service");

const getAllMovements = async (req, res, next) => {
  try {
    const movements = await catalogService.getAllMovements();
    res.status(200).json(movements);
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
    const movement = await catalogService.getMovementById(id);
    res.status(200).json(movement);
  } catch (err) {
    next(err);
  }
};
const getAllElements = async (req, res, next) => {
  try {
    const elements = await catalogService.getAllElements();
    res.status(200).json(elements);
  } catch (err) {
    next(err);
  }
};
const getElementById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.elementId);
    //Verifica si es NaN (parseInt retornó NaN si es que no pudo parsear a int)
    if (isNaN(id)) throw new AppError(400, "ID debe ser numérico");

    const withProgressions = req.query.include === "progressions";

    //derivar al service
    const element = await catalogService.getElementById(id, withProgressions);
    res.status(200).json(element);
  } catch (err) {
    next(err);
  }
};
const getAllProgressions = async (req, res, next) => {
  try {
    const progressions = await catalogService.getAllProgressions();
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
};
