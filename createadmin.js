require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("./models/admin"); // Assuming this is in the models folder
const bcrypt = require("bcryptjs"); // Changed to bcryptjs to match package.json

mongoose.connect(process.env.mongodb_url)
.then(async () => {
    const hashed = await bcrypt.hash("admin123", 10);

    await Admin.create({ // Capitalized 'Admin'
        email : "admin@example.com",
        password : hashed,
    });

    console.log("Admin created successfully");
    process.exit(0);
}).catch(err => console.error(err));