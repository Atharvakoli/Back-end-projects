import jwt from "jsonwebtoken";

const authenticateJWT = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    console.log(req);

    if (!token) {
      return res.status(403).json({
        message: "No token provided, authorization denied",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ message: "Invalid Token, authorization denied" });
  }
};

export default authenticateJWT;
