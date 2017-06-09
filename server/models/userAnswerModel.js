"use strict";

module.exports = function (sequelize, DataTypes) {
    var UserAnswer = sequelize.define("UserAnswer", {
        givenAnswer: {
            type: DataTypes.STRING
        }
    }, {
        classMethods: {
            associate: function (models) {
                UserAnswer.belongsTo(models.Answer);
                UserAnswer.belongsTo(models.UserTestResult);
            }
        }
    });
    return UserAnswer;
};
