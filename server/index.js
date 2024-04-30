import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { addStaff } from "./controllers/staffController.js";

import inventoryRoutes from "./routes/inventory.js";
// import analyticsRoutes from "./routes/"
import staffRoutes from "./routes/staff.js";
import bookingRoutes from "./routes/booking.js";
import historyRoutes from "./routes/history.js";
import authRoutes from "./routes/auth.js";
import menuRoutes from "./routes/menu.js";
import { verifyToken } from "./middlewares/authMiddleware.js";

//config
dotenv.config();

//express app
const app = express();
const __filename = fileURLToPath(import.meta.url);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("public"));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

/* ROUTES WITH FILES */
/*app.post("/staff/add", verifyToken, upload.single("picture"), addStaff);*/

//routes
app.get("/", (req, res) => {
  res.send("Hello to Memories API");
});

const upload = multer({
  storage: storage,
});
app.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  const fileInfo = {
    originalname: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
    path: file.path,
  };
  res.send(fileInfo);
});

app.use("/auth", authRoutes); // localhost:3005/auth/register
app.use("/inventory", inventoryRoutes);
app.use("/staff", staffRoutes);
app.use("/booking", bookingRoutes);
app.use("/history", historyRoutes);
app.use("/menu", menuRoutes);

//connect to mongodb
mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error: ", error.message);
  });
//listener
app.listen(process.env.PORT, () => {
  console.log("Server is running on port ", process.env.PORT);
});
// npm start
// node index.js
