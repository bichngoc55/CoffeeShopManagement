// import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import User from "../models/User.js";
import express from "express";
import argon2 from "argon2";
import validator from "validator";

import nodemailer from "nodemailer";
const app = express();
app.use(cookieParser());

/* REGISTER USER */
let refreshTokens = [];
export const register = async (req, res) => {
  try {
    const {
      Name,
      email,
      password,
      Ava,
      Phone,
      dateOfBirth,
      Position,
      location,
      gender,
    } = req.body;

    // const salt = await bcrypt.genSalt();
    // const passwordHash = await bcrypt.hash(password, salt);
    const hashOptions = {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 5,
      parallelism: 1,
      saltLength: 16,
    };
    const passwordHash = await argon2.hash(password, hashOptions);
    const isValidEmail = validator.isEmail(email);

    if (!isValidEmail) {
      return res
        .status(400)
        .json({ msg: "Please provide a valid Gmail email address" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ msg: "Password must be at least 6 characters" });
    }
    const newUser = new User({
      Name,
      email,
      password: passwordHash,
      Ava,
      Phone,
      dateOfBirth,
      Position,
      location,
      gender,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("User updated: " + user);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ status: "User does not exist. " });

    // const isMatch = await bcrypt.compare(password, user.password);
    console.log("user.password", user.password); // "$argon2id$v=19$m=4096,t=3,p=1$..."
    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch)
      return res.status(400).json({ status: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "60m",
    });
    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH, {
      expiresIn: "365d",
    });
    refreshTokens.push(refreshToken);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });
    delete user.password;
    res.status(200).json({ token, user, refreshToken });
    console.log(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const refresh = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  //const refreshToken = req.cookie.refreshToken;
  //const refreshToken = req.header("token");
  const refreshToken = req.headers.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("refreshToken="))
    ?.split("=")[1];

  if (!refreshToken) {
    return res.status(401).json({ msg: "No token, chua dang nhap" });
  }
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ msg: "token nay invalid" });
  }
  jwt.verify(refreshToken, process.env.JWT_REFRESH, (err, user) => {
    if (err) {
      console.log(err);
    }
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    const newAccessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const newRefreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH,
      {
        expiresIn: "365d",
      }
    );
    refreshTokens.push(newRefreshToken);
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });
    res.status(200).json({ accessToken: newAccessToken });
  });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) return res.json({ status: "User does not exist. " });
    const resetToken = jwt.sign({ id: oldUser._id }, process.env.JWT_REFRESH, {
      expiresIn: "30m",
    });
    oldUser.resetToken = resetToken;
    oldUser.resetTokenExpiration = Date.now() + 30 * 60 * 1000;
    await oldUser.save();
    //const newPassword = "12345678";
    const newPassword = Math.floor(Math.random() * 100000000)
      .toString()
      .padStart(8, "0");
    const hashedPassword = await argon2.hash(newPassword);
    await User.updateOne(
      {
        _id: oldUser._id,
      },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "coffeeshopxh@gmail.com",
        pass: "nbwz atbl grzu pnhs",
      },
    });
    const mailOptions = {
      from: "coffeeshopxh@gmail.com",
      to: oldUser.email,
      subject: "Reset Password",
      text: "Your new password: " + newPassword + ".You can change it later.",
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.json({ status: "Check your new password in email" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// postman
