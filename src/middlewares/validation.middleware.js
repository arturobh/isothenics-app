const validate =
  (schema, source = "body") =>
  (req, res, next) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      const errors = result.error.issues.map((e) => ({
        field: e.path[0],
        message: e.message,
      }));
      return res.status(400).json({ errors });
    }

    req[source] = result.data; // reemplaza con datos limpios y validados
    next();
  };

module.exports = {
  validate,
};
