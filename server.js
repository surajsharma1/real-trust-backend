require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'https://real-trust-frontend-exsq.vercel.app'],
    credentials: true
}));

// Mount Modular Routes (Paths exactly match Frontend API calls)
app.use("/api/projects", require("./routes/projectroutes"));
app.use("/api/clients", require("./routes/clientroutes"));
app.use("/api/subscribe", require("./routes/subscriberroutes")); 
app.use("/api/contact", require("./routes/contactroutes"));     
app.use("/api/admin", require("./routes/adminroutes"));         

// Database Connection & Server Start
mongoose.connect(process.env.mongodb_url)
.then(() => {
    console.log("Connected to MongoDB Atlas successfully");
    
    // Render assigns a dynamic port, or defaults to 5000 locally
    const PORT = process.env.PORT || 5000; 
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((err) => {
    console.error("Database connection error:", err);
});
