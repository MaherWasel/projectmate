if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const mongoose = require("mongoose");
const User = require("../models/User");
const Project = require("../models/Project");
const { titles, descriptions, startDates } = require("./seedHelpers");

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async () => {
    console.log("Connected to MongoDB");
    await seedUsers().then(() => { console.log("Users seeded"); });
    await seedProjects().then(() => { console.log("Projects seeded"); });
    db.close();
});



// Seed the users
const seedUsers = async () => {
    await User.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const newUser = await new User({
            // Create a new user
            username: `User${i}`,
            password: "$2b$10$faRBv1DNahUedtrug4GgFuYJTKkclvUUhWd9VU.d.6mkyMAe7PC6S",
            email: `Example${i}@gmail.com`,
            image: {
                url: "https://res.cloudinary.com/ddjfk5dyz/image/upload/v1731221129/ProfileIcon.2c20b233d476e2ef3481810a6c6828c9_akbqfx.svg"
                , filename: "ProfileIcon.2c20b233d476e2ef3481810a6c6828c9_akbqfx"
            }
        });
        await newUser.save();
    }
}



//Seed projects //

const seedProjects = async () => {
    await Project.deleteMany({});
    const users = await User.find({});
    for (let i = 0; i < 50; i++) {
        const newPrj = await new Project({
            title: titles[Math.floor(Math.random() * titles.length)],
            description: descriptions[Math.floor(Math.random() * descriptions.length)],
            startDate: startDates[Math.floor(Math.random() * startDates.length)],
            requirements: ["React", "Node.js", "MongoDB"],
            majors: ["CS", "SWE", "IT"],
            members: [
                users[Math.floor(Math.random() * users.length)]._id,
                users[Math.floor(Math.random() * users.length)]._id,
                users[Math.floor(Math.random() * users.length)]._id,
            ]
        });
        await newPrj.save();
    }
}



