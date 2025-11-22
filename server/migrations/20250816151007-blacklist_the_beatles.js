const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db) {
    const username = process.env.DEFAULT_USER_USERNAME;
    const password = process.env.DEFAULT_USER_PASSWORD;

    return (await db.createCollection("users")).insertOne({
      username,
      password: await bcrypt.hash(password, 10),
    });
  },

  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async down(db) {
    return await db.dropCollection("users");
  },
};
