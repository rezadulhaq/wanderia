const Route = require("../models")
const fs = require('fs')

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

class RoutesController {
    static async getAllRoutes(req, res, next) {
        try {
            let data = await Route.findAll()
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async addRoute(req, res, next) {
        try {
            const { placeOfOrigin, destination, dataBusiness } = req.body

            // const dataBusiness = fs.readFileSync('./busines.json', 'utf-8')

            let prompt = `berikan rute perjalanan dari ${placeOfOrigin} ke ${destination} yang melewati 4 tempat dari data berikut, ${dataBusiness}, berikan nama tempat, latitude dan longitude, serta alamatnya`
            const { data } = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: prompt,
                temperature: 0,
                max_tokens: 1000,
                // top_p: 1,
                // frequency_penalty: 0,
                // presence_penalty: 0,
                // stop: ["\n"],
            });


            let splitData = (data.choices[0].text).split('\n\n')
            let array = []
            splitData.map((el) => {
                if (el.includes('.')) {
                    array.push(el)
                }
            })

            function convertToArrayOfObjects(data) {
                const headers = ['name', 'address', 'latitude', 'longitude'];
                let result = [];

                for (let i = 0; i < data.length; i++) {
                    let obj = {};
                    let currentData = data[i].split('\n');

                    for (let j = 0; j < headers.length; j++) {
                        obj[headers[j]] = currentData[j].trim();
                    }

                    result.push(obj);
                }

                return result;
            }

            let newArray = convertToArrayOfObjects(array)
            newArray.forEach((el) => {
                let temp = []
                let egg = el.name.split(' ')
                egg.map((el, i) => {
                    if (i !== 0) {
                        temp.push(el)
                    }
                })
                el.name = temp.join(' ')
            })

            let id = "TRIP_" + Math.floor(1000_000 + Math.random() * 9000_000)
            const filteredData = newArray.map(obj => {
                return {
                    id: id,
                    name: obj.name,
                    address: obj.address.replace("Alamat: ", ""),
                    latitude: obj.latitude.replace("Latitude: ", ""),
                    longitude: obj.longitude.replace("Longitude: ", "")
                }
            });

            // res.status(200).json(filteredData)
            await Route.create(filteredData)
            // res.status(200).json(newArray)
            res.status(201).json({ message: 'Success create new trip' })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async getOneRoute(req, res) {
        try {
            const { UserId } = req.params
            let data = await Route.findOne(+UserId)
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async deleteOneRoute(req, res) {
        try {
            const { UserId } = req.params
            await Route.destroy(+UserId)
            res.status(200).json({ message: `Success delete Route with UserId: ${UserId}` })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = RoutesController