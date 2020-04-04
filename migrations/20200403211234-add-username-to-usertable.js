'use strict';

const tableName = "users";
const columnName = "username";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.describeTable(tableName)
        .then(tableDefinition =>
            (tableDefinition[columnName]) ?  Promise.resolve() :
                queryInterface.addColumn(tableName, columnName,{type: Sequelize.STRING(255), unique: true})
        );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(tableName, columnName);
  }
};
