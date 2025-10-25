const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const usersRouter = require("../src/routes/user.routes");
const postsRouter = require("../src/routes/posts.routes");

const app = express();

app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://brogroup.uz",
  "https://admin.brogroup.uz",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

// app.use(cors(corsOptions));
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use("/users", usersRouter);
app.use("/posts", postsRouter);

app.get("/", (req, res) => {
  res.json({ message: "API is live on Vercel 🚀" });
});

module.exports = app;
