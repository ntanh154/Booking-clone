module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        "DoctorInfos", // table name
        "specialtyId", // new field name
        {
          type: Sequelize.INTEGER,
        }
      ),
      queryInterface.addColumn("DoctorInfos", "clinicId", {
        type: Sequelize.INTEGER,
      }),
    ]);
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.removeColumn("Users", "linkedin"),
      queryInterface.removeColumn("Users", "twitter"),
      queryInterface.removeColumn("Users", "bio"),
    ]);
  },
};
