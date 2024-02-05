'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Person extends Model {
        static associate(models) { }
    }
    Person.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Person',
        tableName: 'person',
        timestamps: false
    });
    return Person;
};