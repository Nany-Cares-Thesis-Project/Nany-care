var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var items = require("./models/user");
var Nany = items.Nany;
var User = items.User;
var User = items.User;

const cors = require("cors");
const router = express.Router();
var Nannyhandlers = require("./handlers/Nannyhandlers");
var Adminhandlers = require("./handlers/Adminhandlers");
var userhandlers = require("./handlers/userhandlers");

var app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 5000;

require("dotenv").config(); // to read .env file

// test get req
app.get("/", function (req, res) {
  console.log("test");
  res.send("server is a go!");
});

app.post("/HiringForm", Nannyhandlers.HiringForm);

app.post("/select", userhandlers.selectLocation);

app.post("/signup", userhandlers.userSignUp);
app.get("/logout", userhandlers.userLogOut);
app.post("/login", userhandlers.userLogIn);
app.get("/ret", Nannyhandlers.retrieve);

app.get("/profile", userhandlers.retriveUserByEmail);

app.get("/profilee", userhandlers.retriveUserByToken);
// app.post("/api/doPayment/", userhandlers.payment);

app.post("/insert", Adminhandlers.insert);

app.post("/adminSignUp", Adminhandlers.adminSignUp);

app.post("/adminLogIn", Adminhandlers.adminLogIn);
app.get("/retrieveAllNanies", Adminhandlers.retriveAllNanies);
app.delete("/deleteSpecificNany", Adminhandlers.deleteSpecificNany);
app.patch("/updateNanyInformation", Adminhandlers.updateNanyInformation);
// app.post("/checkout", payment.checkout);
// app.get('/web/checkout/redirect',payment.redirect);
// app.get('/payment/success',payment.success);
// app.get('/payment/cancel',payment.cancel);
// app.post('/stripe/webhook',payment.webhook)
const mongoURI = process.env.ATLAS_URI;
mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log("DataBase connected to the server"))
  .catch((err) => console.log(err));
app.listen(port, () => {
  console.log(`Server is running on ${port} Visit https://localhost:${port}`);
});
