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
db.once("open", () => {
    console.log("Connected to MongoDB");
});

// Seed the users
const seedUsers = async () => {
    await User.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const rand = Math.floor(Math.random() * 1000);
        const newUser = await new User({
            username: `User ${rand}`,
            password: rand,
            email: `Example${rand}@gmail.com`,

            // TODO: Add a real image //

            // images: [
            //     {
            //         url: 'https://res.cloudinary.com/ddjfk5dyz/image/upload/v1725884835/YelpCamp/m27tczqp6wbovmyx5pxm.jpg',
            //         filename: 'YelpCamp/m27tczqp6wbovmyx5pxm',
            //     },
            //     {
            //         url: 'https://res.cloudinary.com/ddjfk5dyz/image/upload/v1725884835/YelpCamp/ljzmjv7rgacyevycogqr.png',
            //         filename: 'YelpCamp/ljzmjv7rgacyevycogqr',
            //     }
            // ],

        });
        await newUser.save();
    }
}
seedUsers().then(() => {
    console.log("Database seeded");
    db.close();
});


//Seed projects //
const seedProjects = async () => {
    await Project.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const newPrj = await new Project({
            title: titles[Math.floor(Math.random() * titles.length)],
            description: descriptions[Math.floor(Math.random() * descriptions.length)],
            startDate: startDates[Math.floor(Math.random() * startDates.length)],
            // TODO: Add a real image //

            // images: [
            //     {
            //         url: 'https://res.cloudinary.com/ddjfk5dyz/image/upload/v1725884835/YelpCamp/m27tczqp6wbovmyx5pxm.jpg',
            //         filename: 'YelpCamp/m27tczqp6wbovmyx5pxm',
            //     },
            //     {
            //         url: 'https://res.cloudinary.com/ddjfk5dyz/image/upload/v1725884835/YelpCamp/ljzmjv7rgacyevycogqr.png',
            //         filename: 'YelpCamp/ljzmjv7rgacyevycogqr',
            //     }
            // ],

        });
        await newPrj.save();
    }
}
seedProjects().then(() => {
    console.log("Database seeded");
    db.close();
});
