const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // get token form the header:
  const token = req.header("x-auth-token");

  // check if no token:
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied!" });
  }
  // verify the token:
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    console.log(decoded);
    req.login = decoded.login;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ msg: "Token is not valid!" });
  }
};
