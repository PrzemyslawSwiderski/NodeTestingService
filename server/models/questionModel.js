"use strict";

/**
 * Created by PSWIDERSKI on 28.03.2017.
 */

module.exports = function (sequelize, DataTypes) {
    var Question = sequelize.define("Question", {
        question: {
            type: DataTypes.STRING
        },
        questionType: {
            type: DataTypes.STRING // "OPEN" or "CLOSED"
        }
    }, {
        classMethods: {
            associate: function (models) {
                Question.belongsTo(models.Test, {
                    onDelete: "CASCADE"
                });
                Question.hasMany(models.Answer,{onDelete: "CASCADE"});
            }
        }
    });
    return Question;
};
