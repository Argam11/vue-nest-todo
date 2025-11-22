export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  DB_URL: process.env.DB_URL,
  APP_URL: process.env.APP_URL || "http://localhost:3000",
});
