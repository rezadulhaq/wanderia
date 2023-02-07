"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
    class Partner extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Partner.hasMany(models.Business, {
                foreignKey: "PartnerId",
                as: "author",
            });
        }
    }
    Partner.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "partner name is required",
                    },
                    notEmpty: {
                        msg: "partner name is required",
                    },
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "email is required",
                    },
                    notEmpty: {
                        msg: "email is required",
                    },
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "password is required",
                    },
                    notEmpty: {
                        msg: "password is required",
                    },
                },
            },
        },
        {
            sequelize,
            modelName: "Partner",
        }
    );
    Partner.beforeCreate(function (partner) {
        partner.password = hashPassword(partner.password);
    });
    return Partner;
};
