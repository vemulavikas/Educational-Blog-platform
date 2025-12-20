require("dotenv").config(); // ✅ Load .env before using env vars
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

// ✅ CORS: configurable for local + production
const corsOrigins = (process.env.CORS_ORIGIN || "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // allow REST tools / same-origin / server-to-server
      if (!origin) return callback(null, true);
      if (corsOrigins.includes("*") || corsOrigins.includes(origin)) return callback(null, true);
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);

app.use(express.json());

// ✅ FIXED: Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ MongoDB
connectDB();

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

// ✅ Serve React build in production (single-service deploy)
if (process.env.NODE_ENV === "production") {
  const clientBuildPath = path.join(__dirname, "..", "frontend", "build");
  app.use(express.static(clientBuildPath));

  app.get("*", (req, res) => {
    // Let API & uploads routes behave normally
    if (req.path.startsWith("/api") || req.path.startsWith("/uploads")) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.sendFile(path.join(clientBuildPath, "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
