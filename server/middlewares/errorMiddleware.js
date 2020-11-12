const notFound = (req, res, next) => {
    const error = new Error(`Error: Not Found: ${req.originalUrl}`);
    res.status(404);
    next(error);
}

const errorHandlerMiddleware = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    console.log(error);
    res.json({
        message: error.name == 'ValidationError' ? 'Field is required!' : error.message,
        messageType: 'error',
        stack: process.env.NODE_ENV === 'production' ? 'This is production env' : error.stack
    });
}

module.exports = {
    notFound,
    errorHandlerMiddleware
}

