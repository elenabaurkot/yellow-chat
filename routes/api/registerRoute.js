const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

// // Load input validation
const validateRegisterInput = require("../../validation/register");

// Load User model
const User = require("../../models/user");

// route POST api/users/register
router.post("/", (req, res) => {
  // Form validation
// const { errors, isValid } = validateRegisterInput(req.body);
// // Check validation
//   if (!isValid) {
//     return res.status(400).json(errors);
//   }
const {name, email, password} = req.body; 
  
User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        usertype: req.body.usertype
      });
      
// Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => 
              jwt.sign(
                {id: user.id},
                config.get("jwtSecret"), 
                {expiresIn: 3600},
                (err, token) => {
                  if (err) throw (err);
                  res.json({
                    token, 
                    id: user.id,
                    name: user.name,
                    email: user.email
                  })
                }
              )
            )
        });
      });
    }
  });
});

module.exports = router;