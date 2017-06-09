"use strict";

module.exports = function (sequelize, DataTypes) {
    var UserTestResult = sequelize.define('UserTestResult', {
        result: {
            type: DataTypes.DOUBLE({precision: 2})
        }
    }, {
        classMethods: {
            associate: function (models) {
                UserTestResult.belongsTo(models.User);
                UserTestResult.belongsTo(models.Test);
                UserTestResult.hasMany(models.UserAnswer,{onDelete: "CASCADE"});
            }
        }
    });
    return UserTestResult;
};
