const Preferences = require("../models/preferences");

class preferencesController {
  static async findAllPreferences(req, res, next) {
    try {
      const dataPreferences = await Preferences.findAllPreferences();
      const response = dataPreferences.map(preference => {
        return {
          ...preference,
          created_at: undefined,
          createdAt: preference.created_at ||null,
          updatedAt: preference.updatedAt || null
        }
      })

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async registerPreferences(req, res, next) {
    try {
      const { name } = req.body;
      const data = await Preferences.createPreferences({
        name
      });

      const newPreference = await Preferences.findPreferencesByPk(data.insertedId)

      res.status(201).json({
        _id: data.insertedId,
        name,
        createdAt: newPreference.created_at,
        updatedAt: null
      });
    } catch (error) {
      next(error);
    }
  }

  static async findPreferencesByPk(req, res, next) {
    try {

      const  {id}  = req.params;
      const dataPreferences = await Preferences.findPreferencesByPk(id);
      if (!dataPreferences) {
        throw {
          name: "NotFound"
        }
      }
      
      const response = {
        ...dataPreferences,
        createdAt: dataPreferences.created_at,
        updatedAt: dataPreferences.updated_at || null
      }
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async updatePreferencesByPk(req, res, next) {
    try {
      const  {id}  = req.params;
      const { name } = req.body;
      const dataPreferences = await Preferences.findPreferencesByPk(id);
      if (!dataPreferences) {
        throw {
          name: "NotFound"
        }
      }
      const data = await Preferences.updatePreferences(id, {
        name,
      });
      const response = {
        ...dataPreferences,
        name,
        createdAt: dataPreferences.created_at,
        updatedAt: data.updated_at || null
      }
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async deletePreferences(req, res, next) {
    try {
    const  {id}  = req.params;
    const dataPreferences = await Preferences.findPreferencesByPk(id);
    if(!dataPreferences) {
        throw {
            name:"NotFound"
        }
    }
    const data = await Preferences.deleteUser(id)
    res.status(200).json({message:" Successfully Deleted"})
      
    } catch (error) {
        next(error)
    }
    
}
}

module.exports = preferencesController;
