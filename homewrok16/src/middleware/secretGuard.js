function secretGuard(req, res, next) {
  const headerKey = req.headers["x-secret-key"];
  const allowedKey = process.env.SECRET_KEY || "s3cr3t";

  if (headerKey !== allowedKey) {
    return res.status(401).json({ error: "Unauthorized: invalid secret key" });
  }
  next();
}

module.exports = secretGuard;

