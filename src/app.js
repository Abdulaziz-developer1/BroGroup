const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

let usersRouter = require("./routes/user.routes");
let postsRouter = require("./routes/posts.routes");

let app = express();
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

app.use("/users", usersRouter);
app.use("/posts", postsRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running!");
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Connection request to MongoDB was successful!"))
    .catch((err) => console.error(err));
});
