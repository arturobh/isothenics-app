//express + router + controller
const router = require("express").Router();
const catalogController = require("./catalog.controller");

/*
GET  /api/catalog/movements              ← listar todos los movements
GET  /api/catalog/movements/:movementId  ← detalle de un movement

GET  /api/catalog/elements               ← listar todos los elements
GET  /api/catalog/elements/:elementId    ← detalle de un element con sus progressions

GET  /api/catalog/progressions           ← listar todas las progressions
*/

router.route("/movements").get(catalogController.getAllMovements);

router.route("/movements/:movementId").get(catalogController.getMovementById);

router.route("/elements").get(catalogController.getAllElements);

router.route("/elements/:elementId").get(catalogController.getElementById);

router
  .route("/elements/:elementId/progressions")
  .get(catalogController.getProgressionsByElementId);

router.route("/progressions").get(catalogController.getAllProgressions);

module.exports = router;
