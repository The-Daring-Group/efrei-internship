'use strict';
const { Model } = require('sequelize');
const { Person } = require('./person');
module.exports = (sequelize, DataTypes) => {
    class Internship extends Model {
        static associate(models) {
            this.hasOne(models.Student)
         }
    }
    Internship.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: DataTypes.STRING,
        startDate: DataTypes.DATE,
        endDate: DataTypes.DATE,
        description: DataTypes.STRING,
        companyName: DataTypes.STRING,
        id_student : {
            type: DataTypes.INTEGER,
            references: {
                model: Person,
                key: 'id',
            }
        },
        id_academic_tutor: {
            type: DataTypes.INTEGER,
            references: {
                model: Person,
                key: 'id',
            }
        },
        id_company_tutor: {
            type: DataTypes.INTEGER,
            references: {
                model: Person,
                key: 'id',
            }
        },
    }, {
        sequelize,
        modelName: 'Internship',
        tableName: 'internship',
        underscored: true,
        timestamps: false,
    });
    return Internship;
};