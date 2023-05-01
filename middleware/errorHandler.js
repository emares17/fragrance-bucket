const HttpStatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER: 500,
  };

class AppError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

class ErrorHandler {
    static handle(err, req, res, next) {
        const statusCode = err.statusCode || HttpStatusCode.INTERNAL_SERVER;
        const message = err.message || 'Something went wrong.';

        if (process.env.NODE_ENV === 'development') {
            console.error(err)
        }

        if (err.isOperational) {
            res.status(statusCode).json({
                status: err.status,message
            });
        } else {
            res.status(HttpStatusCode.INTERNAL_SERVER).json({
                status: 'error',
                message: 'Something went wrong.'
            });
        }
    }
}

module.exports = { AppError, ErrorHandler, HttpStatusCode };