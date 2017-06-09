"use strict";

/**
 * Created by PSWIDERSKI on 28.03.2017.
 */

module.exports = function (sequelize, DataTypes) {
    var Answer = sequelize.define("Answer", {
        ifCorrect: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        answer: {
            type: DataTypes.STRING
        }
    }, {
        classMethods: {
            associate: function (models) {
                Answer.belongsTo(models.Question, {
                    onDelete: "CASCADE"
                });
            }
        }
    });
    return Answer;
};
