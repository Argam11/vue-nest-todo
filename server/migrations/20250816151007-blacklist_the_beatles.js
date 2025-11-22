const bcrypt = require("bcrypt");

module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db) {
    return (await db.createCollection("users")).insertOne({
      username: "Argam",
      password: await bcrypt.hash("12345678", 10),
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
