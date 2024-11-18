if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require("path");
const cookieParser = require('cookie-parser');


// CORS: allows cross-origin requests
const cors = require('cors');

// MongoDB
const mongoose = require("mongoose");
const Project = require("./models/Project");

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB");
});

// setters



// uses
app.use(cors({
    origin: 'http://localhost:3000',  // Todo: Change this to front-end URL
    credentials: true,  // Allow cookies to be sent
}));
app.use(express.json());
app.use(cookieParser());


app.use(express.urlencoded({ extended: true }));

// will it be used? only allah knows
app.use(express.static(path.join(__dirname, "public")));

// import routes
app.use('/', require('./routes/auth'))
app.use('/', require('./routes/utils'))
app.use('/profile', require('./routes/profile'))
app.use('/project', require('./routes/project'))


// home route
app.get("/", async (req, res) => {
    try {
        const projects = await Project.find({});
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: "Unexpected Error Ocurred", error: err });
    }
});


app.all("*", (req, res, next) => {
    console.log("PAGE NOT FOUND");
});

app.listen(8080, () => {
    console.log('LISTENING ON PORT 8080');
});