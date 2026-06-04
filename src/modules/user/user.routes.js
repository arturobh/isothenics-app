//express + router + controller
const router = require("express").Router();
const userController = require("./user.controller");
const authenticate = require("../../middlewares/auth.middleware");
const { validate } = require("../../middlewares/validation.middleware");
const {
  loginSchema,
  registerSchema,
  updateMeSchema,
} = require("./user.schemas");

/*
POST - /register -> registro de usuario
POST - /login   -> logeo
GET - /me (?   authenticate -> obtiene usuario logeado (protegida x jwt)
PATCH - me (?) authenticate -> modifica datos del usuario  
*/

router
  .route("/register")
  .post(validate(registerSchema), userController.registerUser);
router.route("/login").post(validate(loginSchema), userController.loginUser);
router
  .route("/me")
  .get(authenticate, userController.getMe)
  .patch(authenticate, validate(updateMeSchema), userController.updateMe);

module.exports = router;
