const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // get the token from the header
  const token = req.header("x-auth-token");

  if (!token) {
    res.status(401).json({ msg: "No token, access denied!" });
  }

  try {
    // if there is a token, just verify (decode) and send to the user
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    console.log(req.user);
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid!" });
  }
};
