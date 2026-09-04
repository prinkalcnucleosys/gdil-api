import "dotenv/config";

const env = {
  port: Number(process.env.PORT || 5000),

  dbHost: process.env.DB_HOST || "localhost",
  dbPort: Number(process.env.DB_PORT || 3306),
  dbUser: process.env.DB_USER || "root",
  dbPassword: process.env.DB_PASSWORD || "",
  dbName: process.env.DB_NAME || "gdil",

  frontendUrl:
    process.env.FRONTEND_URL ||
    "http://localhost:8080",

  adminUrl:
    process.env.ADMIN_URL ||
    "http://localhost:3000",

  adminApiKey:
    process.env.ADMIN_API_KEY ||
    "",
};

module.exports = { env };