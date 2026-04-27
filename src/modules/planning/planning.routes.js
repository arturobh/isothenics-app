//express + router + controller
const router = require("express").Router();
const planningController = require("./planning.controller");

/*
POST   /api/routines                         ← crear rutina
GET    /api/routines                         ← listar rutinas del usuario
GET    /api/routines/:routineId              ← detalle de rutina
PATCH  /api/routines/:routineId              ← editar rutina
DELETE /api/routines/:routineId              ← eliminar rutina
*/

router
  .route("/")
  .get(planningController.getUserRoutines)
  .post(planningController.createRoutine);

router
  .route("/:routineId")
  .get(planningController.getRoutineById)
  .patch(planningController.editRoutine)
  .delete(planningController.deleteRoutine);

module.exports = router;
