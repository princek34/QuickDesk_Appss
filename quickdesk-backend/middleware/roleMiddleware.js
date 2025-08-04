export const verifyAgentOrAdmin = (req, res, next) => {
  if (!req.user || !["agent", "admin"].includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};
