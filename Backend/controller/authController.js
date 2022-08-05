const express = require("express");
const usermodel = require("../models/usermodel");
// const protectroute=require('../Routers/authhelper')
const jwt = require("jsonwebtoken");
const JWT_KEY = "rchtfgyjhuji3o2e381";

// signup
module.exports.signup = async function signup(req, res) {
  try {
    console.log("Signed up");
    let data = req.body;
    let user = await usermodel.create(data);
    if (user) {
      res.json({
        message: "user signed up",
        data: user,
      });
    } else {
      res.json({
        message: "error",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

// login

module.exports.login = async function login(req, res) {
  try {
    let data = req.body;
    let user = await usermodel.findOne({ email: data.email });
    if (user) {
      if (user.password === data.password) {
        console.log("Logged In");
        let uid = user["_id"];
        let token = jwt.sign({ payload: uid }, JWT_KEY);
        res.cookie("login", token, { httpOnly: true });
        return res.json({
          message: "user has logged in",
          userDetails: data,
        });
      } else {
        return res.json({
          message : "wrong credentials",
        });
      }
    } else 
    {

      return res.json({
        message: "user does not exist",
      });
    }
  } catch (err) {
    return res.json({
      message: err.message,
    });
  }
};

//isauthorised    to check user role

module.exports.isAuthorised = function isAuthorised(roles) {
  return function (req, res, next) {
    if (roles.includes(req.role) === true) {
      next();
    } else {
      res.json({
        message: "operation not allowed",
      });
    }
  };
};

// protectroute

module.exports.protectroute = async function protectroute(req, res, next) {
  try {
    let token;
    if (req.cookies.login) {
      token = req.cookies.login;
      let payload = jwt.verify(token, JWT_KEY);
      if (payload) {
        const user = await usermodel.findById(payload.payload);
        req.role = user.role;
        req.id = user.id;
        console.log(req.id);
        next();
      } else 
      {
        const client = req.get("User-Agent");
        if (client.includes("Chrome")) {
          return res.redirect("/login");
        } else {
          res.json({
            message: "Login Again",
          });
        }
      }
    }
  } catch (err) {
    return res.json({
      message: err.message,
    });
  }
};

//forgetPassword

module.exports.forgetPassword = async function forgetPassword(req, res) {
  let { email } = req.body;
  try {
    const user = await usermodel.findOne({ email: email });
    if (user) {
      const resetToken = user.createResetToken();
      // create url
      let resetPasswordLink = `${req.protocol}://${req.get(
        "host"
      )}/resetPassword/${req.resetToken}`;
      //send email
      //nodemailer
    } else {
      return res.json({
        message: "please signup",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//resetPassword
module.exports.resetPassword = async function resetPassword(req, res) {
  try {
    const token = req.params.token;
    let { password, confirmPassword } = req.body;
    const user = await usermodel.findOne({ resetToken: token });
    if (user) {
      user.resetPasswordHandler(password, confirmPassword);
      await user.save();
      res.json({
        message: "password changed successfully. Please Login Again!",
      });
    } else {
      res.json({
        message: "User Not Found. Enter Correct Details",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.logout = function logout(req, res) {
  res.cookie("login", "", { maxAge: 1 });
  console.log("Logged Out")
  res.json({
    message: "user logged out",
  });
};
