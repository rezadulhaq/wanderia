"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Business extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Business.belongsTo(models.Category, {
                foreignKey: "CategoryId",
                as: "category",
            });
            Business.belongsTo(models.Partner, {
                foreignKey: "PartnerId",
                as: "author",
            });
            Business.hasMany(models.Post, {
                foreignKey: "BusinessId",
                as: "posts",
            });
        }
    }
    Business.init(
        {
            // category id valid, name, valid, mapurl valid,
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Name is Required",
                    },
                    notEmpty: {
                        msg: "Name is Required",
                    },
                },
            },
            latitude: DataTypes.FLOAT,
            longitude: DataTypes.FLOAT,
            address: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Address is Required",
                    },
                    notEmpty: {
                        msg: "Address is Required",
                    },
                },
            },
            price: { type: DataTypes.STRING, defaultValue: "$" },
            rating: { type: DataTypes.STRING, defaultValue: "5" },
            CategoryId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Category is Required",
                    },
                    notEmpty: {
                        msg: "Category is Required",
                    },
                },
            },
            PartnerId: DataTypes.INTEGER,
            status: DataTypes.STRING,
            imageUrl: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Business",
        }
    );
    return Business;
};
