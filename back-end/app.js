const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const projectRouter = require("./routes/projectRoutes");
const profileRouter = require("./routes/profileRoutes");
const authRouter = require("./routes/authRoutes");
const inviteRouter = require("./routes/inviteRoutes");
const utils = require("./routes/utils");
// CORS: allows cross-origin requests
const cors = require("cors");

// uses
app.use(
  cors({
    origin: "http://localhost:3000", // Todo: Change this to front-end URL
    credentials: true, // Allow cookies to be sent
  })
);
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
app.use("/invites", inviteRouter);
app.all("*", (req, res, next) => {
  res.send("PAGE NOT FOUND");
});

module.exports = app;
