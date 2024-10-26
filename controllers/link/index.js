const {
    generateLink,
    verifyLink,
    updatePassword,
} = require("../../usecases/link");

exports.generateLink = async (req, res, next) => {
    try {
        const { email } = req?.body;

        if (!email) {
            throw {
                statusCode: 400,
                message: "Email is required",
            };
        }

        const result = await generateLink(email);
        res.status(200).json({
            ...result,
            message: "Link sent to email " + email,
        });
    } catch (error) {
        next(error);
    }
};

exports.verifyLink = async (req, res, next) => {
    try {
        const { token } = req?.query;

        if (!token) {
            throw {
                statusCode: 400,
                message: "Token is required",
            };
        }

        const user = await verifyLink(token);
        res.status(200).json({ data: user, message: "Link verified" });
    } catch (error) {
        next(error);
    }
};

exports.updatePassword = async (req, res, next) => {
    try {
        const { userId, token, newPassword } = req?.body;

        if (!userId || !token || !newPassword) {
            throw {
                statusCode: 400,
                message: "User ID, token, and new password are required",
            };
        }

        const user = await updatePassword(userId, token, newPassword);
        res.status(200).json({
            data: user,
            message: "Password updated successfully",
        });
    } catch (error) {
        next(error);
    }
};
