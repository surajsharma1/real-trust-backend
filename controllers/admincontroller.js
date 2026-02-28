const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.adminlogin = async (req, res) => {
    const { email, password } = req.body;
    
    // Find admin by email
    const adminUser = await Admin.findOne({ email });
    if (!adminUser) {
        return res.status(400).json({ message: "Admin not found" });
    }
    
    // Compare password using bcrypt 
    const ismatch = await bcrypt.compare(password, adminUser.password);
    if (!ismatch) {
        return res.status(400).json({ message: "Invalid password" });
    }
    
    // Generate JWT token for authentication
    const token = jwt.sign({ id: adminUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

    res.json({ token });
};

