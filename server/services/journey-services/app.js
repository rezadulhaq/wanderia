if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require('express')
const cors = require('cors')
const app = express()
const { connectDB } = require("./configs/mongoDb");
const port =  process.env.PORT || 4003
const router = require('./routes');
const errorHandler = require("./middlewares/errorHandler");

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/routes', router)
app.use(errorHandler)

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });
    })
    .catch((err) => console.log(err));