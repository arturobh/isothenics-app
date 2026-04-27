const router = require("express").Router();

const planningRouter = require("../modules/planning/planning.routes");
const workoutRouter = require("../modules/workout/workout.routes");
const catalogRouter = require("../modules/catalog/catalog.routes");
const userRouter = require("../modules/user/user.routes");

router.use("/routines", planningRouter);
router.use("/workout", workoutRouter);
router.use("/catalog", catalogRouter);
router.use("/user", userRouter);

module.exports = router;
