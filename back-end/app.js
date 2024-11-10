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

app.post("/register", async (req, res) => {
    const { username, password, email } = req.body;
    bcrypt.hash(password, saltRounds, async function (err, hash) {
        if (err) {
            console.error('Error hashing password:', err);
            return res.status(500).send('Error hashing password');
        }
        const newUser = await new User({
            username,
            password: hash,
            email
        });
        await newUser.save();
    });
    const token = jwt.sign({ username }
        , process.env.SECRET_KEY
        , { expiresIn: '1h' });
    // ToDo: add user image//
    res.json({ token, message: 'User registered successfully', userImage: 'https://www.gravatar.com/avatar/' });

});

app.post("/login", async (req, res) => {
    const { username, password, email } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
        return res.status(404).send('User not found');
    }
    else bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
            console.error('Error comparing passwords:', err);
            return res.status(500).send('An error occurred');
        }
        if (result) {
            res.send('User logged in successfully');
        }
        else res.send('Invalid Password');
    });
});




app.all("*", (req, res, next) => {
    console.log("PAGE NOT FOUND");
});

app.listen(8080, () => {
    console.log('LISTENING ON PORT 8080');
});