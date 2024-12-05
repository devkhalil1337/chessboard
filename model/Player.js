const { DataTypes } = require('sequelize');
const sequelize = require('../database/database'); // Ensure you configure your database connection here

const Player = sequelize.define('Player', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rank: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    move: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dateAdded: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

module.exports = Player;
