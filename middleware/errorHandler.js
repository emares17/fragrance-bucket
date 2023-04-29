const errorHandler = (error, req, res, next) => {
    console.log(error)
    return res.status(500).send("Something went wrong");
}

module.exports = errorHandler;