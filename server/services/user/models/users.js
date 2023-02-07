const { ObjectId } = require('mongodb')
const { getDatabase } = require('../config/mongodb')
const userController = require('../controllers/userController')


class User {
    static async findAllUser() {
        try {
            const db = getDatabase()
            const dataUserFromDb = db.collection("Users")
            let dataUser = await dataUserFromDb.find().toArray()
            return dataUser
        } catch (error) {
            throw error
        }
    }

    static async createUser(dataUsers) {
        try {
            const data = {
                ...dataUsers,
                created_at: new Date()
            }
            const db = getDatabase()
            const dataUserFromDb = db.collection("Users")
            const result = await dataUserFromDb.insertOne(data)
            return result
        } catch (error) {
            throw error
        }
    }

    static async updateUser(id, dataUsers) {
        try {
            const data = {
                ...dataUsers,
                updated_at: new Date()
            }
            const db = getDatabase()
            const dataUserFromDb = db.collection("Users")
            const result = await dataUserFromDb.updateOne({
                _id: new ObjectId(id)
            }, {
                $set: data
            })
            return { ...result, updated_at: data.updated_at }
        } catch (error) {
            throw error
        }
    }

    static async findUserByPk(id) {
        try {
            const db = getDatabase()
            const dataUserFromDb = db.collection("Users")
            const data = await dataUserFromDb.findOne({
                _id: new ObjectId(id)
            })
            return data
    } catch (error) {
            throw error
        }
    }

    static async findUserByEmail(email) {
        try {
            const db = getDatabase()
            const dataUserFromDb = db.collection("Users")
            const data = await dataUserFromDb.findOne({
                email
            })
            return data
    } catch (error) {
            throw error
        }
    }

    static async deleteUser(id) {
        try {
            const db = getDatabase()
            const dataUserFromDb = db.collection("Users")
            const data = await dataUserFromDb.deleteOne({
                _id: new ObjectId(id)
            })
            return data
        } catch (error) {
            throw error
        }
    }




}

module.exports = User