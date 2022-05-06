const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const nodemailer = require("nodemailer");
require('dotenv').config()

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const randomNum = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

var db = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT,
});

app.get("/api/getCode", (req, res) => {
  const email = req.body.email;

  const dbSelect = "SELECT passcode FROM users WHERE email = (?)";
  db.query(dbSelect, [email], (err, result) => {
    res.send(result.data)
  });
});

app.post("/api/getCode", (req, res) => {
  const email = req.body.paramEmail;

  const dbSelect = "SELECT passcode FROM users WHERE email = (?)";
  db.query(dbSelect, [email], (err, result) => {
    res.send(result)
  });
});

app.post("/api/insert", (req, res) => {
  const num = randomNum();
  const checkEmail = req.body.email;
  const dbSelect = "SELECT * FROM users";
  db.query(dbSelect, (err, result) => {
    res.send(result);
    const arr = result;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].email == checkEmail) {
        const key = arr[i].id;
        const dbinsert = `UPDATE users SET passcode = ${num} WHERE id = ${key}`;
        db.query(dbinsert);
        sendMail(checkEmail, num)
      } else {
        const dbinsertd = `INSERT INTO users (email,passcode) VALUES(?, ?)`;
        db.query(dbinsertd, [checkEmail, num]);
        sendMail(checkEmail, num)
       
      }
    }
  });
});

app.listen(4004, () => {
  console.log("Listening to server 4004");
});

const sendMail = (email, num) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_FROM,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.MAIL_FROM,
    to: `${email}`,
    subject: "Authentication Code",
    text: `Here is your code:  ${num}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
