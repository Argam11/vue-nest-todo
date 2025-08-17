const bcrypt = require("bcrypt");

module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db) {
    return (await db.createCollection("users")).insertOne({
      username: "admin",
      password: await bcrypt.hash("admin123", 10),
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
