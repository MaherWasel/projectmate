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
    // await seedUsers().then(() => { console.log("Users seeded"); });
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
        });
        await newUser.save();
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
    }
}



//Seed projects //

const seedProjects = async () => {
    // const users = [new mongoose.Types.ObjectId("6730bd1978ab4d17ed259bb9"),
    // new mongoose.Types.ObjectId("6730bd1978ab4d17ed259bbb"),
    // new mongoose.Types.ObjectId("6730bd1978ab4d17ed259bbd"),
    // new mongoose.Types.ObjectId("6730bd1978ab4d17ed259bbf"),
    // new mongoose.Types.ObjectId("6730bd1978ab4d17ed259bc1"),
    // new mongoose.Types.ObjectId("6730bd1978ab4d17ed259bc3")
    // ]
    await Project.deleteMany({});
    // const newUser = await new User({
    //     // Create a new user
    //     username: `User${1234567890}`,
    //     password: "$2b$10$faRBv1DNahUedtrug4GgFuYJTKkclvUUhWd9VU.d.6mkyMAe7PC6S",
    //     email: `Example${1234567890}@gmail.com`,
    // });
    // await newUser.save();
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



