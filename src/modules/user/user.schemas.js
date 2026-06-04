const { z } = require("zod");

const loginSchema = z.object({
  username: z.string().min(1, "Usuario requerido"),
  password: z.string().min(1, "Password requerida"),
});
const registerSchema = z.object({
  username: z.string().min(3, "Username debe tener al menos 3 caracteres"),
  email: z.email("Email inválido"),
  password: z.string().min(6, "Password debe tener al menos 6 caracteres"),
});
const updateMeSchema = z
  .object({
    email: z.string().email("Email inválido").optional(),
    username: z
      .string()
      .min(3, "Username debe tener al menos 3 caracteres")
      .optional(),
    password: z
      .string()
      .min(6, "Password debe tener al menos 6 caracteres")
      .optional(),
  })
  .refine((data) => data.email || data.username || data.password, {
    message: "Debe enviar al menos un campo para actualizar",
  });

module.exports = {
  loginSchema,
  registerSchema,
  updateMeSchema,
};
