const { Otp, VerificationTokens } = require("../../models");

exports.createOTP = async (payload) => {
    console.log(payload);
    const data = await Otp.create(payload);

    return data;
};

exports.findOTP = async (whereCondition) => {
    const opt = {
        where: whereCondition,
    };

    const data = await Otp.findOne(opt);

    return data;
};

exports.createToken = async (payload) => {
    console.log(payload);
    const data = await VerificationTokens.create(payload);

    return data;
};

exports.findToken = async (whereCondition) => {
    const opt = {
        where: whereCondition,
    };

    const data = await VerificationTokens.findOne(opt);

    return data;
};
