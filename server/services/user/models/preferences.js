const { ObjectId } = require('mongodb')
const { getDatabase } = require('../config/mongodb')
const userController = require('../controllers/preferencesController')


class Preferences {
    static async findAllPreferences() {
        try {
            const db = getDatabase()
            const dataPreferencesFromDb = db.collection("Preferences")
            let dataPreferences = await dataPreferencesFromDb.find().toArray()
            return dataPreferences
        } catch (error) {
            throw error
        }
    }

    static async createPreferences(dataPreferences) {
        try {
            const data = {
                ...dataPreferences,
                created_at: new Date()
            }
            const db = getDatabase()
            const dataPreferencesFromDb = db.collection("Preferences")
            const result = await dataPreferencesFromDb.insertOne(data)
            return result
        } catch (error) {
            throw error
        }
    }

    static async updatePreferences(id, dataPreferences) {
        try {
            const data = {
                ...dataPreferences,
                updated_at: new Date()
            }
            const db = getDatabase()
            const dataPreferencesFromDb = db.collection("Preferences")
            const result = await dataPreferencesFromDb.updateOne({
                _id: new ObjectId(id)
            }, {
                $set: data
            })
            return { ...result, updated_at: data.updated_at }
        } catch (error) {
            throw error
        }
    }

    static async findPreferencesByPk(id) {
        try {
            const db = getDatabase()
            const dataPreferencesFromDb = db.collection("Preferences")
            const data = await dataPreferencesFromDb.findOne({
                _id: new ObjectId(id)
            })
            return data
    } catch (error) {
            throw error
        }
    }

    static async deletePreferences(id) {
        try {
            const db = getDatabase()
            const dataPreferencesFromDb = db.collection("Preferences")
            const data = await dataPreferencesFromDb.deleteOne({
                _id: new ObjectId(id)
            })
            return data
        } catch (error) {
            throw error
        }
    }




}

module.exports = Preferences