import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: "Unauthorized" });

  try {
    const token = authorization.split(" ")[1];
    req.user = jwt.verify(token, process.env.SECRET);
    next();
  } catch (e) {
    res.status(403).json({ message: "Invalid token" });
  }
};
