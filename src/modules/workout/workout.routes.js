//express + router + controller
const router = require("express").Router();
const workoutController = require("./workout.controller");

/*
        /workout              ruta base en index

POST                            ← iniciar workout
GET                           ← historial
GET    /:workoutId              ← detalle de workout
POST   /:workoutId/sets         ← registrar set
PATCH  /:workoutId/complete     ← completar workout
*/

router
  .route("/")
  .get(workoutController.getWorkoutHistory)
  .post(workoutController.startWorkout);

router.route("/:workoutId").get(workoutController.getWorkoutDetail);

router.route("/:workoutId/sets").post(workoutController.registerSet);

router.route("/:workoutId/complete").patch(workoutController.completeWorkout);

module.exports = router;
