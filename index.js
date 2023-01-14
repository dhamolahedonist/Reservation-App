import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectToMongoDB from "./db.js";
import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";
import usersRoute from "./routes/users.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
app.use(express.json());

const PORT = 7777;

mongoose.set("strictQuery", false);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/users", usersRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`server listen on port ${PORT}`);
});

// const connectToMongoDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI);
//     console.log("connected to mongodb");
//   } catch (error) {
//     throw error;
//   }
// };

// mongoose.connection.on("disconnected", () => {
//   console.log("MongoDB disconnected");
// });
// mongoose.connection.on("connected", () => {
//   console.log("MongoDB connected");
// });
