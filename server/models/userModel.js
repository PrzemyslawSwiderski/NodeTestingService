"use strict";

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            surname: {
                type: DataTypes.STRING,
                allowNull: false
            },
            login: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            adminRights: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            editorRights: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "tmp@gmail.com"
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "admin"
            },
            loggedIn: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        }, {
            classMethods: {
                associate: function (models) {
                    User.hasMany(models.Test, {
                        foreignKey: "EditorId",
                        as: "editTest"
                    });
                    User.hasMany(models.UserTestResult);
                }
            }
        }
    );
    return User;
};