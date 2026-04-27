const AppError = require("../../errors/AppError");
const planningService = require("./planning.service");

const getUserRoutines = async (req, res) => {};

const getRoutineById = async (req, res, next) => {
  //recibe de req.params sin parsear
  try {
    const id = parseInt(req.params.routineId);
    //Verifica si es NaN (parseInt retornó NaN si es que no pudo parsear a int)
    if (isNaN(id)) throw new AppError(400, "ID debe ser numérico");

    //derivar al service
    const routine = await planningService.getRoutineForDisplay(id);
    res.status(200).json(routine);
  } catch (err) {
    next(err);
  }
};

const createRoutine = async (req, res) => {};
const editRoutine = async (req, res) => {};
const deleteRoutine = async (req, res) => {};

module.exports = {
  getUserRoutines,
  getRoutineById,
  createRoutine,
  editRoutine,
  deleteRoutine,
};
