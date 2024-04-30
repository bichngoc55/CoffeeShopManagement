import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import User from "../models/User.js";
import express from "express";
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

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

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

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ status: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ status: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH, {
      expiresIn: "365d",
    });
    refreshTokens.push(refreshToken);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
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
  const refreshToken = req.cookie.refreshToken;
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
      secure: true,
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
    oldUser.resetTokenExpiration = Date.now() + 30 * 60 * 1000; // 30 minutes
    await oldUser.save();
    const newPassword = "12345678";
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
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
      text: "Your new password: 12345678. You can change it later.",
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.json({ status: "Check your new passworn in email" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// postman
