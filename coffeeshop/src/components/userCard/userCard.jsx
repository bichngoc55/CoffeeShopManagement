"use client";
import React from "react";
import { useRef, useEffect, useState } from "react";
import userImage from "./user.jpg";
import "./usercard.css";
const UserCard = () => {
  return (
    <div className="container">
      <div className="image-container">
        <img src={userImage} alt="User" />
      </div>

      <div className="inforContainer">
        <lable className="name">Hồ Kim Thiên Nga</lable>
        <label className="position">Staff</label>
        <label className="status">Đang làm việc</label>
      </div>

      <div className="buttonCon">
        <button className="buttonE">Edit</button>
        <button className="buttonD">Delete</button>
      </div>
    </div>
  );
};

export default UserCard;
