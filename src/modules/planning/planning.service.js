const AppError = require("../../errors/AppError");
const planningRepository = require("./planning.repository");

const getRoutineById = async (id) => {
  const routine = await planningRepository.findRoutineById(id);
  if (!routine) throw new AppError(404, "Routine not found");
  console.log(routine);
  const { user_id, ...rest } = routine;
  return rest;
};

const getRoutineForDisplay = async (id) => {
  const routine = await planningRepository.findRoutineForDisplay(id);
  if (!routine) throw new AppError(404, "Routine not found");
  console.log(routine);
  const formatted = {
    ...routine,
    block: routine.block.map((block) => ({
      ...block,
      block_exercise: block.block_exercise.map((ex) => ({
        ...ex,
        block_exercise_component: ex.block_exercise_component.map((comp) => ({
          ...comp,
          label: `${comp.movement.name} en ${comp.element_progression.progression.name} de ${comp.element_progression.element.name}`,
          labelShort: `${comp.movement.name} en ${comp.element_progression.progression.name}`,
        })),
      })),
    })),
  };

  return formatted;
};

module.exports = {
  getRoutineById,
  getRoutineForDisplay,
};
