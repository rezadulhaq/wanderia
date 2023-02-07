"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        const category = require("../categories.json");
        let tempPartner = 1;
        const data = require("../businesses.json").map(function (el) {
            tempPartner++;
            if (tempPartner > 1000) {
                tempPartner = 1;
            }
            let temp;
            category.map(function (element, idx) {
                if (el.category === element.name) {
                    temp = idx + 1;
                }
            });

            delete el.id;
            delete el.category;
            delete el.icon;
            if (el.price === null) {
                el.price = `$`;
            }
            el.CategoryId = temp;
            el.PartnerId = tempPartner;
            el.createdAt = new Date();
            el.updatedAt = new Date();
            el.status = "active";
            return el;
        });

        await queryInterface.bulkInsert("Businesses", data, {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("Businesses", null, {});
    },
};
