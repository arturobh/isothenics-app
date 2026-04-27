const AppError = require("../../errors/AppError");
const workoutRepository = require("./workout.repository");
const planningRepository = require("../planning/planning.repository");

//private functions
const buildSnapshot = (routine) => ({
  name: routine.name,
  blocks: routine.block.map((block) => ({
    name: block.name,
    order: block.order,
    exercises: block.block_exercise.map((ex) => ({
      blockExerciseId: ex.id,
      minSets: ex.min_sets,
      maxSets: ex.max_sets,
      restSeconds: ex.restSeconds,
      components: ex.block_exercise_component.map((comp) => ({
        repsMin: comp.reps_min,
        repsMax: comp.reps_max,
        holdSecondsMin: comp.hold_seconds_min,
        holdSecondsMax: comp.hold_seconds_max,
        movement: comp.movement,
      })),
    })),
  })),
});

const getWorkoutHistory = async () => {};
const startWorkout = async (routineId) => {
  // llama directo al planning repository — sin pasar por HTTP
  const routine = await planningRepository.findRoutineById(routineId);

  if (!routine) throw new AppError(404, "Routine not found");
  //if (routine.userId !== userId) throw { status: 403, message: 'Forbidden' }
  // construye el snapshot — congela el estado actual de la rutina
  const routineSnapshot = buildSnapshot(routine);

  const userId = 1;

  return workoutRepository.createWorkout({
    routineId,
    userId,
    routineSnapshot,
  });
};
const getWorkoutDetail = async () => {};
const registerSet = async (workoutId, payload) => {
  const { workoutBlockExerciseId, setNumber, rpe, rir, components } = payload;

  // verifica que el workout existe y está activo
  const workout = await workoutRepository.findWorkoutById(workoutId);
  if (!workout) throw new AppError(404, "Workout not found");
  if (workout.status !== "in_progress")
    throw new AppError(409, "Workout is not in progress");

  // verifica que el workoutBlockExercise pertenece a este workout
  const wbe = await workoutRepository.findWorkoutBlockExerciseById(
    workoutBlockExerciseId,
  );
  if (!wbe) throw new AppError(404, "WorkoutBlockExercise not found");
  if (wbe.workout_id !== workoutId) throw new AppError(403, "Forbidden");

  return workoutRepository.createSet({
    workoutBlockExerciseId,
    setNumber,
    rpe,
    rir,
    components,
  });
};
const completeWorkout = async () => {};

module.exports = {
  getWorkoutHistory,
  startWorkout,
  getWorkoutDetail,
  registerSet,
  completeWorkout,
};
