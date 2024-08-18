const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "1d" });
};

//getting token

const getTokenFrom = (req) => {
  const authorization = req.get("authorization");

  if (authorization && authorization.startsWith("bearer ")) {
    return authorization.replace("bearer ", "");
  }
};

module.exports = { getTokenFrom, generateToken };
