const { clientDB } = require("../configs/mongoDb");

class Route {
    static routeCollection() {
        return clientDB().collection("routes");
    }

    static get route() {
        return this.routeCollection();
    }

    static async findAll() {
        try {
            return await this.route.find().toArray()
        } catch (error) {
            throw error
        }
    }

    static async findOne(UserId) {
        try {
            return await this.route.find({ UserId }).toArray()
        } catch (error) {
            throw error
        }
    }

    static async create(payload) {
        try {
            return await this.route.insertMany(payload)
        } catch (error) {
            throw error
        }
    }

    static async destroy(UserId) {
        try {
            return await this.route.deleteMany({ UserId })
        } catch (error) {
            throw error
        }
    }
}

module.exports = Route