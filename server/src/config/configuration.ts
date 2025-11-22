export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  DB_URL: process.env.DB_URL,
  APP_URL: process.env.APP_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  DEFAULT_USER_USERNAME: process.env.DEFAULT_USER_USERNAME,
  DEFAULT_USER_PASSWORD: process.env.DEFAULT_USER_PASSWORD,
});
