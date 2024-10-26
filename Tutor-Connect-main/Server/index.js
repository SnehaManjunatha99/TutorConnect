// Importing all the required dependencies
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
require("dotenv").config(); // Ensure dotenv is loaded at the top
const sgMail = require("@sendgrid/mail"); // SendGrid mail
const cors = require("cors");

// Import routes
const { StudentRouter } = require("./routes/studentRoutes");
const { adminRouter } = require("./routes/admin.route");

// Set the SendGrid API key from environment variables
if (process.env.SENDGRID_API_KEY) {
  console.log("SendGrid API Key loaded successfully");
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
} else {
  console.error("Error: SendGrid API Key is missing or invalid.");
  process.exit(1); // Exit the app if API key is missing
}

// Using all the required middlewares in the app
app.use(express.json());
app.use(cors());
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET || "defaultsecret", // Use default if SESSION_SECRET is not provided
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set to true if using HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);
app.use(cookieParser());

// Defining the student and admin routes
app.use("/student", StudentRouter);
app.use("/admin", adminRouter);

// Basic route to check if the server is running fine
app.get("/", (req, res) => {
  res.send("Everything is going fine");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("No database connection required.");
});
