function errorHandler(err, req, res, next) {
    let status = 500;
    let message = "Internal Server Error";

    res.status(status).json({ message });
}

module.exports = errorHandler;