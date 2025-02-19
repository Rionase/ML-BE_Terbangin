const { getTokenFromHeaders, extractToken } = require("../helpers/auth");
const { getProfileById } = require("../usecases/profile");

exports.nonAuthMiddleware = async (req, res, next) => {
    try {
        if (!req?.headers?.authorization) {
            return next()
        }

        const token = getTokenFromHeaders(req?.headers);

        const extractedToken = extractToken(token);

        const user = await getProfileById(extractedToken?.id);

        if (!user) {
            return next({
                message: "Forbidden!",
                statusCode: 403,
            });
        }

        req.user = user;

        next();
    } catch (error) {
        error.statusCode = 401;
        next(error);
    }
};
