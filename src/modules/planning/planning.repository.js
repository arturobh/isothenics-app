const { prisma } = require("../../config/db");

const findRoutineById = async (routineId) => {
  return prisma.routine.findUnique({
    where: { id: routineId },
    include: {
      block: {
        orderBy: { order: "asc" },
        include: {
          block_exercise: {
            orderBy: { order: "asc" },
            include: {
              block_exercise_component: {
                include: { movement: true },
              },
            },
          },
        },
      },
    },
  });
};
const findRoutineForDisplay = async (id) => {
  return await prisma.routine.findUnique({
    where: { id: id },
    include: {
      block: {
        select: {
          name: true,
          order: true,
          block_exercise: {
            select: {
              minSets: true,
              maxsets: true,
              block_exercise_component: {
                select: {
                  reps_min: true,
                  reps_max: true,
                  hold_seconds_min: true,
                  hold_seconds_max: true,
                  movement: {
                    select: { name: true },
                  },
                  element_progression: {
                    select: {
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
      },
    },
  });
};

module.exports = { findRoutineById, findRoutineForDisplay };
