export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  DB_URL: process.env.DB_URL,
});
