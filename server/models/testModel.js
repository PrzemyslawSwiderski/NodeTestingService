"use strict";

/**
 * Created by PSWIDERSKI on 28.03.2017.
 */

module.exports = function (sequelize, DataTypes) {
    var Test = sequelize.define("Test", {
        public: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        language: {
            type: DataTypes.STRING,
            defaultValue: "EN"
        }
    }, {
        classMethods: {
            associate: function (models) {
                Test.belongsTo(models.User, {
                    foreignKey: "EditorId"
                });
                Test.hasMany(models.Question,{onDelete: "CASCADE"});
                Test.hasMany(models.UserTestResult);
                Test.belongsTo(models.Job);
            }
        }
    });
    return Test;
};
