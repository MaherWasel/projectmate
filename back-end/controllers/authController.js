if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Compare passwords
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { username: user.username, _id: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Store cookie in the browser
    res.cookie("authToken", token, {
      httpOnly: true, // Helps prevent client-side JavaScript from accessing the cookie
      // ToDo: add secure: true in production
      secure: process.env.NODE_ENV === "production", // Ensures the cookie is sent over HTTPS
      maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
      // sameSite: 'lax' // Helps prevent CSRF
    });

    // Send response with token and success message
    res.json({
      success: true,
      message: "User logged in successfully",
      record: {
        username: user.username,
      },
      token,
    });
  } catch (err) {
    console.error("Error logging in:", err);
    res
      .status(500)
      .json({ success: false, message: "An Unexpected Error Occurred!!!" });
  }
};

module.exports.register = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Check if all required fields are provided
    if (!username || !password || !email) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide all required fields: username, password, email",
      });
    }
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Username already exists" });
    }

    // create a new user
    bcrypt.hash(password, saltRounds, async function (err, hash) {
      if (err) {
        console.error("Error hashing password:", err);
        return res
          .status(500)
          .json({ success: false, messsage: "Error hashing password" });
      }
      // Create a new user
      const newUser = await new User({
        username,
        password: hash,
        email,
        image: {
          url: "https://res.cloudinary.com/ddjfk5dyz/image/upload/v1731221129/ProfileIcon.2c20b233d476e2ef3481810a6c6828c9_akbqfx.svg",
          filename: "ProfileIcon.2c20b233d476e2ef3481810a6c6828c9_akbqfx",
        },
      });
      // Save user to database
      await newUser.save();

      // Create a token
      const token = jwt.sign(
        { username, _id: newUser._id },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );

      // Store cookie in the browser
      res.cookie("authToken", token, {
        httpOnly: true, // Helps prevent client-side JavaScript from accessing the cookie
        // ToDo: add secure: true in production
        secure: process.env.NODE_ENV === "production", // Ensures the cookie is sent over HTTPS
        maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
        // sameSite: 'lax' // Helps prevent CSRF
      });

      // send the token to the client
      res.json({
        success: true,
        message: "User registered successfully",
        record: {
          username,
        },
        token,
      });

      // ToDo: add user image//
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ success: false, message: "An Unexpected Error Occurred!!!" });
  }
};

module.exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        seccuss: false,
        message: "You are not logged in",
      });
    }
    //Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY);

    const currentUser = await User.findById(decoded._id);
    if (!currentUser) {
      return res.status(401).json({
        seccuss: false,
        message: "User no longer exists",
      });
    }

    req.user = currentUser;
    next();
  } catch (error) {
    return res.status(401).json({
      seccuss: false,
      message: "Something went wrong",
    });
  }
};
