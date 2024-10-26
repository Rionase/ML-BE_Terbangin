const {
    generateOTPEmail,
    generateOTPSMS,
    verifyOTP,
} = require("../../usecases/otp");

exports.generateOTPEmail = async (req, res, next) => {
    try {
        const { email } = req?.body;

        if (!email) {
            throw {
                statusCode: 400,
                message: "Email is required",
            };
        }

        const result = await generateOTPEmail(email);

        res.status(200).json({
            data: result,
            message: "OTP sent to email " + email,
        });
    } catch (error) {
        next(error);
    }
};

exports.generateOTPSMS = async (req, res, next) => {
    try {
        const { phoneNumber } = req?.body;

        if (!phoneNumber) {
            throw {
                statusCode: 400,
                message: "Phone number is required",
            };
        }

        const result = await generateOTPSMS(phoneNumber);

        res.status(200).json({
            data: result,
            message: "OTP sent to phone number " + phoneNumber,
        });
    } catch (error) {
        next(error);
    }
};

exports.verifyOTP = async (req, res, next) => {
    try {
        const { email, phoneNumber, otp } = req?.body;

        if (!email && !phoneNumber) {
            throw {
                statusCode: 400,
                message: "Email or phone number is required",
            };
        }

        if (!otp) {
            throw {
                statusCode: 400,
                message: "OTP is required",
            };
        }

        const result = await verifyOTP(email, phoneNumber, otp);
        res.status(200).json({ data: result, message: "OTP verified" });
    } catch (error) {
        next(error);
    }
};
