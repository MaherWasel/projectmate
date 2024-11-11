if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require("path");

// CORS: allows cross-origin requests
const cors = require('cors');


// password hashing
const bcrypt = require('bcrypt');
const saltRounds = 10;


// Token
const jwt = require('jsonwebtoken');


// MongoDB

const mongoose = require("mongoose");
const User = require("./models/User");
const Project = require("./models/Project");

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB");
});

// setters
app.set("views", path.join(__dirname, "views"));


// uses
app.use(express.json());



app.use(cors());
app.use(express.urlencoded({ extended: true }));

// will it be used? only allah knows
app.use(express.static(path.join(__dirname, "public")));





app.get("/", async (req, res) => {
    try {
        const projects = await Project.find({});
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: "Unexpected Error Ocurred", error: err });
    }
});
app.get("/project/:id", async (req, res) => {

    const { id } = req.params;
    try {
        const projects = await Project.findById(id).populate('members');
        if (!projects) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: "Unexpected Error Ocurred", error: err });
    }
});
app.get("/profile/:username", async (req, res) => {

    const { username } = req.params;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Unexpected Error Ocurred", error: err });
    }
});

app.post("/register", async (req, res) => {
    const { username, password, email } = req.body;

    try {


        // Check if all required fields are provided
        if (!username || !password || !email) {
            return res.status(400).send('Please provide all required fields: username, password, email');
        }
        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send('Username already exists');
        }

        // create a new user
        bcrypt.hash(password, saltRounds, async function (err, hash) {
            if (err) {
                console.error('Error hashing password:', err);
                return res.status(500).send('Error hashing password');
            }

            // Create a new user
            const newUser = await new User({
                username,
                password: hash,
                email
            });
            // Save user to database
            await newUser.save();

            // Create a token
            const token = jwt.sign({ username, userId: newUser._id }
                , process.env.SECRET_KEY
                , { expiresIn: '1h' });

            // send the token to the client
            res.json({ token, message: 'User registered successfully', username });

            // ToDo: add user image//
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('An Unexpected Error Occurred!!!');
    }



});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    try {
        // Check if the user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare passwords
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign({ username: user.username, userId: user._id }
            , process.env.SECRET_KEY
            , { expiresIn: '1h' });

        // Send response with token and success message
        res.json({
            token,
            message: 'User logged in successfully',
            username: user.username,
        });
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).send('An Unexpected Error Occurred!!!');
    }
});






app.all("*", (req, res, next) => {
    console.log("PAGE NOT FOUND");
});

app.listen(8080, () => {
    console.log('LISTENING ON PORT 8080');
});