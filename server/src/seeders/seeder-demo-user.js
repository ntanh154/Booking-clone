"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //    email: DataTypes.STRING,
    //   password: DataTypes.STRING,
    //   firstName: DataTypes.STRING,
    //   lastName: DataTypes.STRING,
    //   address: DataTypes.STRING,
    //   phoneNumber: DataTypes.STRING,
    //   gender: DataTypes.BOOLEAN,
    //   roleId: DataTypes.STRING,
    //   positionId: DataTypes.STRING,
    //   image: DataTypes.STRING,
    return queryInterface.bulkInsert("Users", [
      {
        email: "admin@gmail.com",
        password: "123456",
        firstName: "Tien Anh",
        lastName: "Nguyen",
        address: "Vietnamese",
        phoneNumber: "0706666666",
        gender: 1,
        roleId: "R1",
        positionId: "doctor",
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
