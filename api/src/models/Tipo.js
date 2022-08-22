const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('Tipo', {
        ID: {
            // type: DataTypes.UUID,
            // defaultValue: DataTypes.UUIDV4,
            // primaryKey: true
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, { timestamps: false });
};