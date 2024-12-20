const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const projectRouter = require("./routes/projectRoutes");
const profileRouter = require("./routes/profileRoutes");
const authRouter = require("./routes/authRoutes");
const adminRouter = require("./routes/adminRoutes");
const inviteRouter = require("./routes/inviteRoutes");
const utils = require("./routes/utils");
// CORS: allows cross-origin requests
const cors = require("cors");

// uses
app.use(cors());

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

// will it be used? only allah knows
app.use(express.static(path.join(__dirname, "public")));

// import routes
app.use("/", authRouter);
app.use("/", utils);
app.use("/profile", profileRouter);
app.use("/projects", projectRouter);
app.use("/admin", adminRouter);
app.use("/invites", inviteRouter);
app.all("*", (req, res, next) => {
  res.send("PAGE NOT FOUND");
});

module.exports = app;
