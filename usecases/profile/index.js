const userRepo = require("../../repositories/user");
const HttpError = require("../../utils/HttpError");

exports.getProfileById = async (id) => {
    const data = await userRepo.getUserById(id);

    if (!data) {
        throw new HttpError({
            statusCode: 404,
            message: `User with ID ${id} does not exist!`,
        });
    }
    return data;
};

exports.getProfileByEmail = async (email) => {
    const data = await userRepo.getUserByEmail(email);

    if (!data) {
        throw new HttpError({
            statusCode: 404,
            message: `User with email ${email} does not exist!`,
        });
    }
    return data;
};

exports.getProfileByPhoneNumber = async (phoneNumber) => {
    const data = await userRepo.getUserByPhoneNumber(phoneNumber);

    if (!data) {
        throw new HttpError({
            statusCode: 404,
            message: `User with phone number ${phoneNumber} does not exist!`,
        });
    }
    return data;
};

exports.updateProfileById = async (id, payload) => {
    const data = await userRepo.updateUserById(id, payload);

    if (!data) {
        throw new HttpError({
            statusCode: 404,
            message: `User with ID ${id} does not exist!`,
        });
    }
    return data;
};

exports.deleteProfileById = async (id) => {
    const data = await userRepo.deleteUserById(id);

    if (!data) {
        throw new HttpError({
            statusCode: 404,
            message: `User with ID ${id} does not exist!`,
        });
    }
    return data;
};
