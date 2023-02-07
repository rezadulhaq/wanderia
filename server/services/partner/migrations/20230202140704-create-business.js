"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Businesses", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            latitude: {
                type: Sequelize.FLOAT,
            },
            longitude: {
                type: Sequelize.FLOAT,
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            mapUrl: {
                type: Sequelize.STRING,
            },
            CategoryId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Categories",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            PartnerId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Partners",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Businesses");
    },
};
