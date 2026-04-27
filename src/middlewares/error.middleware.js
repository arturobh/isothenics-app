const errorMiddleware = (err, req, res, next) => {
  // error conocido
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  // error inesperado
  console.error(err);

  return res.status(500).json({
    message: "Error interno del servidor",
  });
};

module.exports = {
  errorMiddleware,
};
