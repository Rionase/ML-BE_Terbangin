const profileUsecase = require("../../usecases/profile");

exports.getProfileById = async (req, res, next) => {
    try {
        const { id: userId } = req?.params;
        const data = await profileUsecase.getProfileById(userId);

        return res.status(200).json({
            data,
            message: null,
        });
    } catch (e) {
        next(e);
    }
};

exports.getProfileByEmail = async (req, res, next) => {
    try {
        const { email } = req?.params;
        const data = await profileUsecase.getProfileByEmail(email);

        return res.status(200).json({
            data,
            message: null,
        });
    } catch (e) {
        next(e);
    }
};

exports.getProfileByPhoneNumber = async (req, res, next) => {
    try {
        const { phoneNumber } = req?.params;
        const data = await profileUsecase.getProfileByPhoneNumber(phoneNumber);

        return res.status(200).json({
            data,
            message: null,
        });
    } catch (e) {
        next(e);
    }
};

exports.updateProfileById = async (req, res, next) => {
    try {
        const { id } = req?.params;
        let payload = req?.body;

        if (req?.files) {
            const { picture } = req?.files;
            payload = { ...payload, picture };
        }
        const data = await profileUsecase.updateProfileById(id, payload);

        return res.status(200).json({
            data,
            message: null,
        });
    } catch (e) {
        next(e);
    }
};

exports.deleteProfileById = async (req, res, next) => {
    try {
        const { id: userId } = req?.params;
        const data = await profileUsecase.deleteProfileById(userId);

        return res.status(200).json({
            data,
            message: null,
        });
    } catch (e) {
        next(e);
    }
};
