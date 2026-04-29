const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error(
        "Missing MongoDB connection string. Set MONGO_URI (or MONGODB_URI) in environment variables."
      );
    }

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
    });
    console.log("✅ MongoDB Connected...");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message || error);
    console.error(
      "Hint: check Atlas Network Access (IP whitelist), credentials, cluster status, and MONGO_URI format."
    );
    process.exit(1);
  }
};

module.exports = connectDB;