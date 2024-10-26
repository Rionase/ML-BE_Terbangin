class HttpError extends Error {
    constructor(payload) {
        super(payload.message);
        this.statusCode = payload.statusCode;
    }
}

module.exports = HttpError;