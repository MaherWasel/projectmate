if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require("path");
const cookieParser = require('cookie-parser');

const multer = require('multer');
const { storage } = require('./cloudinary');
const upload = multer({ storage });

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
const { url } = require('inspector');

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
app.use(cookieParser());



app.use(cors({
    origin: 'http://localhost:3000',  // Frontend's URL (Change this to your front-end URL)
    credentials: true,  // Allow cookies to be sent
}));
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
    const token = req.cookies.authToken;

    try {
        const user = await User.findOne({ username });
        const userObj = user.toObject();
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (token) {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            if (decoded._id == user._id) {
                userObj.isOwner = true;
            }
        }

        res.json(userObj);
    } catch (err) {
        res.status(500).json({ message: "Unexpected Error Ocurred", error: err });
    }
});

app.get("/image", async (req, res) => {

    const token = req.cookies.authToken;
    try {
        // const user = await User.findOne({ username });
        // const userObj = user.toObject();
        // if (!user) {
        //     return res.status(404).json({ message: "User not found" });
        // }
        if (token) {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const user = await User.findById(decoded._id);
            res.json(user.image.url);
        }
        else res.json("https://res.cloudinary.com/ddjfk5dyz/image/upload/v1731221129/ProfileIcon.2c20b233d476e2ef3481810a6c6828c9_akbqfx.svg");
    } catch (err) {
        res.status(500).json({ message: "Unexpected Error Ocurred", error: err });
    }
});

app.post("/profile/:username", upload.single('image'), async (req, res) => {
    const { links, bio } = req.body;
    const { username } = req.params;
    const token = req.cookies.authToken;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (token) {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            if (decoded._id == user._id) {
                console.log("Updating user profile");

                // update user profile. discard empty links, images
                const updateData = { bio };
                if (links) {
                    // filter out empty links
                    updateData.links = links.split(',')
                        .filter(link => link.trim() !== '');;
                }
                if (req.file) {
                    updateData.image = { url: req.file.path, filename: req.file.filename };
                }
                await user.updateOne(updateData);
                await user.save();
            }
        }

        res.redirect(`/profile/${username}`);
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
        const token = jwt.sign({ username: user.username, _id: user._id }
            , process.env.SECRET_KEY
            , { expiresIn: '1h' });


        // Store cookie in the browser
        res.cookie('authToken', token, {
            httpOnly: true, // Helps prevent client-side JavaScript from accessing the cookie
            // ToDo: add secure: true in production
            secure: process.env.NODE_ENV === 'production', // Ensures the cookie is sent over HTTPS
            maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
            // sameSite: 'lax' // Helps prevent CSRF
        });


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