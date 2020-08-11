var express = require("express");
var auth = require("../middlewares/auth");
var User = require("../model/user");

// register user using jwt
exports.register = async (req, res, next) => {
  try {
    var user = await User.create(req.body.user, user);
    var token = await auth.generateToken(user);
    res.json({ Success: "user created successfully", token });
  } catch (error) {
    next(error);
  }
};

//login user
exports.login = async (req, res, next) => {
  var { email, password } = req.body.user;
  if (!email || !password) {
    res.json("Email/Password is required");
  }
  try {
    var user = await User.findOne({ email });
    if (!user) {
      res.json("Email is Invalid");
    }
    if (!user.verify(password)) {
      res.json("password is invalid");
    }
    var token = await auth.generateToken(user);
    res.json({
      email: user.email,
      id: user.id,
      username: user.username,
      token,
    });
  } catch (error) {
    next(error);
  }
};

//get current user
exports.currentUser = async (req, res, next) => {
  try {
    var user = await User.findById(req.user.userId);
    res.json({ user });
  } catch (error) {
    next(error);
  }
};

// update current user
exports.updateUser = async (req, res, next) => {
  console.log(req.body.user);
  try {
    var updtaedUser = await User.findByIdAndUpdate(
      req.user.userId,
      req.body.user,
      { new: true }
    );
    res.json({ updtaedUser });
  } catch (error) {
    next(error);
  }
};
