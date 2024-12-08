const mongoose = require("mongoose");
const app = require("./app");

if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv");
  dotenv.config({ path: "./config.env" });
}

mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});
// home for deployment
app.get("/", (req, res) => {
  res.send("Welcome to ProjectMate");
});


app.listen(8080, () => {
  console.log("LISTENING ON PORT 8080");
});
