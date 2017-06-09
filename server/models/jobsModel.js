"use strict";

module.exports = function (sequelize, DataTypes) {
    var Job = sequelize.define("Job", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        company: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: function (models) {
                Job.hasMany(models.Test);
            }
        }
    });
    return Job;
};

