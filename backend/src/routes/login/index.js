const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Login = require("../../model/Login");
const route = express.Router();
const config = require("config");

/* @route   POST /login
 * @desc    Register/fetch a user login
 * @access  public
 */

route.post(
  "/",
  [
    check("email", "Email is required").not().isEmpty(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    // validate the checks from the middleware:
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    // if there is no error, we are going to check if the user exist.
    const { email, password } = req.body;

    try {
      let login = await Login.findOne({ email });

      if (login) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists!" }] });
      }

      // create the user login:
      login = new Login({ email, password });

      // encrypt the password before saving it in the database:
      const salt = await bcrypt.genSalt(10);
      login.password = await bcrypt.hash(password, salt);

      await login.save();

      // generates the jwt:
      const payload = {
        login: {
          id: login.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 1200 },
        (error, token) => {
          if (error) throw error;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error!");
    }
  }
);

/* @route   POST /logout
 * @desc    logout the user
 * @access  public
 */
route.post('/logout', async(req, res) => {
  try{
      let randomNumberToAppend = toString(Math.floor((Math.random() * 1000) + 1));
      let randomIndex = Math.floor((Math.random() * 10) + 1);
      let hashedRandomNumberToAppend = await bcrypt.hash(randomNumberToAppend, 10);
    console.log(req.token);
      // now just concat the hashed random number to the end of the token
      req.token = req.token + hashedRandomNumberToAppend;
      return res.status(200).json({status: 'OK'});
  }catch(err){
      return res.status(500).json("err.message jalkdfj");
  }
});

module.exports = route;
