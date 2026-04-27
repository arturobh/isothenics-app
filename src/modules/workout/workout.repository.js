const { prisma } = require("../../config/db");

const findWorkoutById = async (workoutId) => {
  return prisma.workout.findUnique({
    where: { id: workoutId },
  });
};

const findWorkoutBlockExerciseById = async (workoutBlockExerciseId) => {
  /*return prisma.workout_block_exercise.findUnique({
    where: { id: workoutBlockExerciseId },
    include: {
      block_exercise: {
        include: {
          block_exercise_component: {
            include: {
              movement: true,
              element_progression: {
                include: {
                  element: {
                    select: { name: true },
                  },
                  progression: {
                    select: { name: true },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
*/
  return prisma.workout_block_exercise.findUnique({
    where: { id: workoutBlockExerciseId },
  });
};

const createWorkout = async ({ routineId, userId = 1, routineSnapshot }) => {
  return prisma.$transaction(async (tx) => {
    const workout = await tx.workout.create({
      data: {
        routine_id: routineId,
        user_id: userId,
        status: "in_progress",
        date: new Date(),
        routine_snapshot: routineSnapshot, // JSON serializado
      },
    });

    // trae los blockExercises para crear los WorkoutBlockExercise
    const blockExercises = await tx.block_exercise.findMany({
      where: {
        block: { routine_id: routineId },
      },
    });

    await tx.workout_block_exercise.createMany({
      data: blockExercises.map((be, index) => ({
        workout_id: workout.id,
        block_exercise_id: be.id,
        order: be.order,
        status: "pending",
      })),
    });

    return tx.workout.findUnique({
      where: { id: workout.id },
      include: { workout_block_exercise: true },
    });
  });
};

const createSet = async ({
  workoutBlockExerciseId,
  setNumber,
  rpe,
  rir,
  components,
}) => {
  return prisma.$transaction(async (tx) => {
    const set = await tx.workout_set.create({
      data: {
        workout_block_exercise_id: workoutBlockExerciseId,
        set_number: setNumber,
        rpe: rpe ?? null,
        rir: rir ?? null,
        completed_at: new Date(),
      },
    });

    await tx.workout_set_component.createMany({
      data: components.map((comp) => ({
        workout_set_id: set.id,
        block_exercise_component_id: comp.blockExerciseComponentId,
        reps: comp.reps ?? null,
        hold_seconds: comp.holdSeconds ?? null,
      })),
    });

    return tx.workout_set.findUnique({
      where: { id: set.id },
      include: { workout_set_component: true },
    });
  });
};

module.exports = {
  findWorkoutById,
  findWorkoutBlockExerciseById,
  createWorkout,
  createSet,
};
