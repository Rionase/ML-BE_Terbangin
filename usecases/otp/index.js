const { v4: uuidv4 } = require("uuid");
const moment = require("moment-timezone");
const { Op } = require("sequelize");
const sendEmail = require("../../config/emailConfig");
const { sendSMSV1, sendSMSV2 } = require("../../config/smsConfig");
const { createOTP, findOTP } = require("../../repositories/verification");
const {
    getUserByEmail: findUserByEmail,
    getUserByPhoneNumber: findUserByPhoneNumber,
} = require("../../repositories/user");
const generate = require("./utils");
const template = require("../../helpers/templateHTML");

exports.generateOTPEmail = async (email) => {
    const user = await findUserByEmail(email);

    if (user) {
        throw {
            statusCode: 400,
            message: "Email already registered",
        };
    }

    const otp = generate.OTP();
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + 10);

    const payload = {
        id: uuidv4(),
        email,
        code: otp,
        isUsed: false,
        expire: expirationDate,
    };

    const newOTP = await createOTP(payload);
    const html = template.emailOTP(otp);

    await sendEmail({
        to: email,
        subject: "OTP for Registration",
        html,
    });

    return {
        ...newOTP.dataValues,
        expire: moment(newOTP.expire).format("YYYY-MM-DD HH:mm:ss"),
        createdAt: moment(newOTP.createdAt).format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment(newOTP.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
    };
};

exports.generateOTPSMS = async (phoneNumber) => {
    const formattedPhoneNumber = phoneNumber;
    const user = await findUserByPhoneNumber(formattedPhoneNumber);

    if (user) {
        throw {
            statusCode: 400,
            message: "Phone number already registered",
        };
    }

    const otp = generate.OTP();
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + 10);

    const payload = {
        id: uuidv4(),
        phoneNumber: formattedPhoneNumber,
        code: otp,
        isUsed: false,
        expire: expirationDate,
    };

    const newOTP = await createOTP(payload);

    let smsSent = false;

    try {
        smsSent = await sendSMSV1(formattedPhoneNumber, otp);
    } catch (error) {
        smsSent = await sendSMSV2(formattedPhoneNumber, otp);
    }

    if (!smsSent) {
        throw {
            status: 500,
            message: "Failed to send OTP via SMS",
        };
    }

    return {
        ...newOTP.dataValues,
        expire: moment(newOTP.expire).format("YYYY-MM-DD HH:mm:ss"),
        createdAt: moment(newOTP.createdAt).format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment(newOTP.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
    };
};

exports.verifyOTP = async (email, phoneNumber, otp) => {
    const formattedPhoneNumber = phoneNumber;

    let whereCondition = {
        code: otp,
        isUsed: false,
        expire: { [Op.gt]: new Date() },
    };

    if (email) {
        whereCondition.email = email;
    } else if (formattedPhoneNumber) {
        whereCondition.phoneNumber = formattedPhoneNumber;
    }

    const existingOTP = await findOTP(whereCondition);

    if (existingOTP) {
        await existingOTP.update({ isUsed: true });
        return existingOTP;
    } else {
        throw {
            statusCode: 400,
            message: "Invalid OTP or OTP expired",
        };
    }
};
