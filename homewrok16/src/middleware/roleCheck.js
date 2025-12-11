function isAdmin(req, res, next) {
  const role = (req.headers["x-role"] || "").toLowerCase();
  if (role !== "admin") {
    return res.status(403).json({ error: "Admin privileges required" });
  }
  next();
}

function isEditor(req, res, next) {
  const role = (req.headers["x-role"] || "").toLowerCase();
  if (role !== "editor" && role !== "admin") {
    return res.status(403).json({ error: "Editor privileges required" });
  }
  next();
}

module.exports = {
  isAdmin,
  isEditor,
};

