const AppError = require("../../errors/AppError");
const workoutService = require("./workout.service");

const getWorkoutHistory = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
const startWorkout = async (req, res, next) => {
  try {
    const id = parseInt(req.body.routineId);
    //Verifica si es NaN (parseInt retornó NaN si es que no pudo parsear a int)
    if (isNaN(id)) throw new AppError(400, "ID debe ser numérico");

    //service call
    const workout = await workoutService.startWorkout(id);
    res.status(201).json(workout);
  } catch (err) {
    next(err);
  }
};
const getWorkoutDetail = async (req, res, next) => {
  try {
    const id = parseInt(req.params.workoutId);
    console.log(id);
    //Verifica si es NaN (parseInt retornó NaN si es que no pudo parsear a int)
    if (isNaN(id)) throw new AppError(400, "ID debe ser numérico");
  } catch (err) {
    next(err);
  }
};
const registerSet = async (req, res, next) => {
  try {
    const id = parseInt(req.params.workoutId);
    //Verifica si es NaN (parseInt retornó NaN si es que no pudo parsear a int)
    if (isNaN(id)) throw new AppError(400, "ID debe ser numérico");

    const set = await workoutService.registerSet(id, req.body);
    res.status(201).json(set);
  } catch (err) {
    next(err);
  }
};
const completeWorkout = async (req, res, next) => {
  try {
    const id = parseInt(req.params.workoutId);
    console.log(id);
    //Verifica si es NaN (parseInt retornó NaN si es que no pudo parsear a int)
    if (isNaN(id)) throw new AppError(400, "ID debe ser numérico");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getWorkoutHistory,
  startWorkout,
  getWorkoutDetail,
  registerSet,
  completeWorkout,
};
