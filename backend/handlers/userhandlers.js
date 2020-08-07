var express = require("express");
var bodyParser = require("body-parser");
var items = require("../models/user");
var User = items.User;
var config = require("../config");
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
var jwtDecode = require("jwt-decode");

var accountSid = config.accountSid; // Your Account SID from www.twilio.com/console
var authToken = config.authToken; // Your Auth Token from www.twilio.com/console
var toNum = config.toNum;
var fromNum = config.fromNum;
var twilio = require("twilio");
var client = new twilio(accountSid, authToken);

require("dotenv").config(); // to read .env file
module.exports = {
  sendSMS: function (req, res) {
    // console.log("here1", req.body[0].latitude, "this is latitude");
    console.log("here2", req.body[1], "total");
    console.log("here3", req.body[2].name, "name");
    console.log("hi from send sms");
    var location = req.body[0];
    var total = req.body[1];
    var info = req.body[2];
    var decode = jwtDecode(token);
    console.log(decode);
    var userMail = decode.email;
    var phone = decode.phoneNumber;
    var userName = decode.name;
    client.messages
      .create({
        body:
          " \n Hi " +
          info.name +
          " from Nanny app \n You have been reserved by " +
          userName +
          " and his/her location, https://www.google.com/maps/search/?api=1&query=" +
          location.latitude +
          "," +
          location.longitude +
          " \n here is The contact information: \n Phone number : 0" +
          phone +
          " \n E-mail: " +
          userMail +
          " \n he/she will pay " +
          total +
          " in the end of the visit , he/she reserved you for " +
          total / info.cost +
          " hours .",
        to: toNum, // Text this number
        from: fromNum, // From a valid Twilio number
      })
      .then((message) => console.log(message))
      .catch((err) => console.log(err));
  },
  userSignUp: function (req, res) {
    // console.log(req);
    var x = req.body;
    var newUser = new User({
      email: x.Email,
      password: x.password,
      name: x.Name,
      phoneNumber: x.PhoneNumber,
    });
    User.findOne({ email: newUser.email })
      .then((profile) => {
        if (!profile) {
          bcrypt.hash(newUser.password, saltRounds, function (err, hash) {
            if (err) {
              console.log("Error is", err.message);
              res.send("Error");
            } else {
              newUser.password = hash;
              newUser
                .save()
                .then(() => {
                  console.log("user saved");
                  res.send("User authenticated");
                  // console.log(res);
                })
                .catch((err) => {
                  console.log("Error is ", err.message);
                  res.send("Error is ", err.message);
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
            } else if (result == false) {
              console.log("password or email wrong");
              res.send("password or email wrong");
            } else if (result == true) {
              // create token
              token = jwt.sign(
                {
                  email: profile.email,
                  name: profile.name,
                  phoneNumber: profile.phoneNumber,
                  password: profile.password,
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
            }
          });
        }
      })
      .catch((err) => {
        console.log("Error is ", err.message);
      });
  },
  sendFeedBack: function (req, res) {
    var decode = jwtDecode(token);
    console.log(decode);
    var userMail = decode.email;
    var phone = decode.phoneNumber;
    var Name = decode.name;
    console.log(req.body);
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "nannyHirring@gmail.com",
        pass: "nannyHirring12345",
      },
    });

    let mailOptions = {
      from: userMail,
      to: "nannycarecom@gmail.com",
      subject: "Feed Back",
      text:
        "Name : " +
        Name +
        "\n Phone Number : " +
        phone +
        "\n Email : " +
        userMail +
        "\n Says : " +
        req.body.text,
    };

    // Step 3
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        res.status(400).json("Error:" + err);
      }
      res.json("Email send");
    });
  },
  retriveUserByToken: function (req, res) {
    console.log(token, "token");
    var decode = jwtDecode(token);
    console.log(decode, "decode");

    User.find({
      email: decode.email,
    })
      .then((user) => {
        if (user) {
          console.log(user, "your user here");
          res.send(user);
        } else {
          res.send("User does not exist");
        }
      })
      .catch((err) => {
        res.send("error: " + err);
      });
  },
};
