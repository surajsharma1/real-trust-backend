require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Models
const Admin = require("./models/admin");
const Project = require("./models/project");
const Client = require("./models/client");
const Contact = require("./models/contact");
const Subscriber = require("./models/subscriber");

// Sample data
const seedData = async () => {
  try {
    await mongoose.connect(process.env.mongodb_url);
    console.log("Connected to MongoDB");

    // Clear existing data
    await Admin.deleteMany({});
    await Project.deleteMany({});
    await Client.deleteMany({});
    await Contact.deleteMany({});
    await Subscriber.deleteMany({});
    console.log("Cleared existing data");

    // Create Admin
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const admin = await Admin.create({
      email: "admin@example.com",
      password: hashedPassword,
    });
    console.log("Admin created:", admin.email);

    // Create Sample Projects
    const projects = await Project.insertMany([
      {
        name: "Modern Villa Construction",
        description: "A beautiful modern villa with panoramic views and luxury amenities.",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
      },
      {
        name: "Commercial Complex",
        description: "State-of-the-art commercial building with modern infrastructure.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
      },
      {
        name: "Residential Apartment",
        description: "Luxurious residential apartments with premium facilities.",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
      },
      {
        name: "Office Building",
        description: "Modern office space designed for productivity and comfort.",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
      },
    ]);
    console.log("Created", projects.length, "projects");

    // Create Sample Clients
    const clients = await Client.insertMany([
      {
        name: "John Smith",
        designation: "CEO, TechCorp",
        description: "Exceptional service and attention to detail. The team delivered our project on time and within budget.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      },
      {
        name: "Sarah Johnson",
        designation: "Director, RealEstate Inc",
        description: "Professional and reliable. We are extremely satisfied with the construction quality.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      },
      {
        name: "Michael Brown",
        designation: "Owner, Brown Enterprises",
        description: "Outstanding craftsmanship and excellent communication throughout the project.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      },
    ]);
    console.log("Created", clients.length, "clients");

    // Create Sample Contacts (Fixed field names to match model)
    const contacts = await Contact.insertMany([
      {
        fullName: "Emily Davis",
        email: "emily@example.com",
        mobile: "+1 234 567 8901",
        city: "New York",
      },
      {
        fullName: "Robert Wilson",
        email: "robert@example.com",
        mobile: "+1 234 567 8902",
        city: "Los Angeles",
      },
    ]);
    console.log("Created", contacts.length, "contacts");

    // Create Sample Subscribers
    const subscribers = await Subscriber.insertMany([
      { email: "subscriber1@example.com" },
      { email: "subscriber2@example.com" },
      { email: "subscriber3@example.com" },
    ]);
    console.log("Created", subscribers.length, "subscribers");

    console.log("\n✅ Seed data created successfully!");
    console.log("\nAdmin Login Credentials:");
    console.log("  Email: admin@example.com");
    console.log("  Password: admin123");
    
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
