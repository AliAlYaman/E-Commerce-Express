const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash("password", 10); // Hash password

    return queryInterface.bulkInsert("users", [
      {
        name: "John Doe",
        email: "john.doe@example.com",
        password: hashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", { email: "john.doe@example.com" }, {});
  },
};
