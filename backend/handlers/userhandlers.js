var express = require("express");
var bodyParser = require("body-parser");
var items = require("../models/user");
var User = items.User;
const cors = require("cors");
var app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
var bcrypt = require("bcrypt");
var saltRounds = 10;

require("dotenv").config(); // to read .env file
module.exports = {
  selectLocation: function (req, res) {
    console.log("user location is ", req.body);
  },
  userSignUp: function (req, res) {
    console.log(req.body);
    var newUser = new User({
      email: req.body.Email,
      password: req.body.password,
      name: req.body.Name,
      phoneNumber: req.body.PhoneNumber,
    });
    User.findOne({ email: newUser.email })
      .then((profile) => {
        if (!profile) {
          bcrypt.hash(newUser.password, saltRounds, function (err, hash) {
            if (err) {
              console.log("Error is", err.message);
            } else {
              newUser.password = hash;
              newUser
                .save()
                .then(() => {
                  res.send("User authenticated");
                })
                .catch((err) => {
                  console.log("Error is ", err.message);
                });
            }
          });
        } else {
          res.send("User already exists...");
        }
      })
      .catch((err) => {
        console.log("Error is", err.message);
      });
  },
  userLogOut: function (req, res) {
    res.status(200).send({ auth: false, token: null });
  },
  userLogIn: function (req, res) {
    console.log(req);
    var newUser = {};
    newUser.email = req.body.Email;
    newUser.password = req.body.password;
    User.findOne({ email: newUser.email })
      .then((profile) => {
        if (!profile) {
          console.log("NOT");
          res.send("User not exist");
        } else {
          bcrypt.compare(newUser.password, profile.password, function (
            err,
            result
          ) {
            if (err) {
              return res.status(401).json({
                message: "Auth failed",
                token: token,
              });
              console.log("Error is", err.message);
            } else if (result == true) {
              // create token
              const token = jwt.sign(
                {
                  email: profile.email,
                  password: profile.id,
                },
                process.env.JWT_KEY,
                {
                  expiresIn: "1h",
                }
              );
              res.status(200).json({
                message: "Auth granted, welcome!",
                token: token,
              });
              console.log(token);
            } else {
              res.send("User Unauthorized Access");
            }
          });
        }
      })
      .catch((err) => {
        console.log("Error is ", err.message);
      });
  },
  retriveUserByEmail: function (req, res) {
    console.log(req.header);
    console.log(req.body, "body");
    var decoded = jwt.verify(req.headers["authorization"], process.env.JWT_KEY);
    User.findOne({
      _id: decoded._id,
    })
      .then((user) => {
        if (user) {
          res.json(user);
        } else {
          res.send("User does not exist");
        }
      })
      .catch((err) => {
        res.send("error: " + err);
      });
  },
  retriveUserByToken: function (req, res) {
    User.find({ email: "sura@gmail.com" }, function (err, user) {
      if (err) {
        res.json(err);
      } else {
        console.log(user[0]);
        res.json(user[0]);
      }
    });
  },
  payment: function (req, res) {
    return stripe.charges
      .create({
        amount: req.body.amount, // Unit: cents
        currency: "eur",
        source: req.body.tokenId,
        description: "Test payment",
      })
      .then((result) => res.status(200).json(result));
  },
};

// middleware to validate token
const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next(); // to continue the flow
  } catch (err) {
    res.status(400).json({ error: "Token is not valid" });
  }
};
