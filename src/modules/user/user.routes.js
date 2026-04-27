//express + router + controller
const router = require("express").Router();

router.route("/test").get((req, res, next) => {
  res.send("ok from " + req.originalUrl);
});

module.exports = router;
