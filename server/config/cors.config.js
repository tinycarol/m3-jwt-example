const cors = require("cors");

const corsMiddleware = cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3001",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});

module.exports = corsMiddleware;
