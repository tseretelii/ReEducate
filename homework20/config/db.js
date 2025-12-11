const mongoose = require("mongoose");

const connectDB = async () => {
  const uri =
    process.env.MONGODB_URI ||
    "mongodb+srv://wereteligigi_db_user:2kX6axoYNGjgFN7C@homework17.jrnigyx.mongodb.net/?appName=Homework17";

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error", err);
    process.exit(1);
  }
};

module.exports = connectDB;

