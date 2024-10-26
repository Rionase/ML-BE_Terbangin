const passangerUsecase = require("../../usecases/passanger");
const isUUID = require("../../helpers/isUUID");

exports.createPassanger = async (req, res, next) => {
    try {
        let payload = req.body;

        // Validate payload
        if (!payload || Object.keys(payload).length === 0) {
            throw {
                statusCode: 400,
                message: "Payload(json) is required and cannot be empty",
            };
        }
        // Validate userId
        if (!payload.userId || !isUUID(payload.userId)) {
            throw {
                statusCode: 400,
                message: "userId must be a valid UUID and cannot be empty",
            };
        }

        // Validate type
        const validTypes = ["BABY", "CHILD", "ADULT"];
        if (!payload.type || !validTypes.includes(payload.type)) {
            throw {
                statusCode: 400,
                message: "type must be one of BABY, CHILD, ADULT",
            };
        }

        // Validate title
        const validTitles = ["MRS", "MR"];
        if (!payload.title || !validTitles.includes(payload.title)) {
            throw {
                statusCode: 400,
                message: "title must be one of MRS, MR",
            };
        }

        // Validate fullName
        if (
            !payload.fullName ||
            typeof payload.fullName !== "string" ||
            payload.fullName.trim() === ""
        ) {
            throw {
                statusCode: 400,
                message: "fullName cannot be empty",
            };
        }

        // Validate familyName
        if (
            payload.familyName !== undefined &&
            payload.familyName !== null &&
            (typeof payload.familyName !== "string" ||
                payload.familyName.trim() === "")
        ) {
            throw {
                statusCode: 400,
                message: "familyName, if provided, cannot be empty",
            };
        }

        // Validate birthDate
        const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (
            !payload.birthDate ||
            !dateFormatRegex.test(payload.birthDate) ||
            isNaN(Date.parse(payload.birthDate))
        ) {
            throw {
                statusCode: 400,
                message:
                    "birthDate must be in the format YYYY-MM-DD and a valid date",
            };
        }

        // Validate nationality
        if (
            !payload.nationality ||
            typeof payload.nationality !== "string" ||
            payload.nationality.trim() === ""
        ) {
            throw {
                statusCode: 400,
                message: "nationality cannot be empty",
            };
        }

        // Validate identityId
        if (
            !payload.identityId ||
            typeof payload.identityId !== "string" ||
            payload.identityId.trim() === ""
        ) {
            throw {
                statusCode: 400,
                message: "identityId cannot be empty",
            };
        }

        // Validate issuingCountry (optional field)
        if (
            !payload.issuingCountry ||
            typeof payload.issuingCountry !== "string" ||
            payload.issuingCountry.trim() === ""
        ) {
            throw {
                statusCode: 400,
                message: "issuingCountry cannot be empty",
            };
        }

        // Family name is optional, if not provided, set it to null
        if (payload.familyName === "" || payload.familyName === undefined) {
            payload = {
                userId: payload.userId,
                type: payload.type,
                title: payload.title,
                fullName: payload.fullName,
                familyName: null,
                birthDate: payload.birthDate,
                nationality: payload.nationality,
                identityId: payload.identityId,
                issuingCountry: payload.issuingCountry,
            };
        }

        const data = await passangerUsecase.createPassanger(payload);

        return res.status(201).json({
            data,
            message: "Passanger created",
        });
    } catch (error) {
        return next(error);
    }
};

exports.getPassangerById = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id || id === ":id") {
            throw {
                statusCode: 400,
                message: "ID is required and cannot be empty",
            };
        }

        const data = await passangerUsecase.getPassangerById(id);

        return res.status(200).json({
            data,
            message: "Passanger found",
        });
    } catch (error) {
        return next(error);
    }
};

exports.getPassangerByUserId = async (req, res, next) => {
    try {
        const { userId } = req.params;

        console.log(userId);

        if (!userId || userId === ":userId") {
            throw {
                statusCode: 400,
                message: "ID is required and cannot be empty",
            };
        }

        const data = await passangerUsecase.getPassangerByUserId(userId);

        return res.status(200).json({
            data,
            message: "Passanger found",
        });
    } catch (error) {
        return next(error);
    }
};

exports.updatePassanger = async (req, res, next) => {
    try {
        const { id } = req.params;
        const payload = req.body;

        // Validate id
        if (!id || !isUUID(id)) {
            throw {
                statusCode: 400,
                message: "ID is required and must be a valid UUID",
            };
        }

        // Validate payload
        if (!payload || Object.keys(payload).length === 0) {
            throw {
                statusCode: 400,
                message: "Payload(json) is required and cannot be empty",
            };
        }

        // Validate type if present
        const validTypes = ["BABY", "CHILD", "ADULT"];
        if (payload.type && !validTypes.includes(payload.type)) {
            throw {
                statusCode: 400,
                message: "type must be one of BABY, CHILD, ADULT",
            };
        }

        // Validate title if present
        const validTitles = ["MRS", "MR"];
        if (payload.title && !validTitles.includes(payload.title)) {
            throw {
                statusCode: 400,
                message: "title must be one of MRS, MR",
            };
        }

        // Validate fullName if present
        if (
            payload.fullName &&
            (typeof payload.fullName !== "string" ||
                payload.fullName.trim() === "")
        ) {
            throw {
                statusCode: 400,
                message: "fullName cannot be empty",
            };
        }

        // Validate familyName if present
        if (
            payload.familyName !== undefined &&
            payload.familyName !== null &&
            (typeof payload.familyName !== "string" ||
                payload.familyName.trim() === "")
        ) {
            throw {
                statusCode: 400,
                message: "familyName, if provided, cannot be empty",
            };
        }

        // Validate birthDate if present with format YYYY-MM-DD
        const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (
            payload.birthDate &&
            (!dateFormatRegex.test(payload.birthDate) ||
                isNaN(Date.parse(payload.birthDate)))
        ) {
            throw {
                statusCode: 400,
                message:
                    "birthDate must be in the format YYYY-MM-DD and a valid date",
            };
        }

        // Validate nationality if present
        if (
            payload.nationality &&
            (typeof payload.nationality !== "string" ||
                payload.nationality.trim() === "")
        ) {
            throw {
                statusCode: 400,
                message: "nationality, if provided, cannot be empty",
            };
        }

        // Validate identityId if present
        if (
            payload.identityId &&
            (typeof payload.identityId !== "string" ||
                payload.identityId.trim() === "")
        ) {
            throw {
                statusCode: 400,
                message: "identityId cannot be empty",
            };
        }

        // Validate issuingCountry if present
        if (
            payload.issuingCountry &&
            (typeof payload.issuingCountry !== "string" ||
                payload.issuingCountry.trim() === "")
        ) {
            throw {
                statusCode: 400,
                message: "issuingCountry, if provided, cannot be empty",
            };
        }

        const data = await passangerUsecase.updatePassanger(payload, id);

        return res.status(200).json({
            data,
            message: "Passanger updated",
        });
    } catch (error) {
        return next(error);
    }
};

exports.deletePassanger = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            throw {
                statusCode: 400,
                message: "Id is required",
            };
        }

        const data = await passangerUsecase.deletePassanger(id);

        return res.status(200).json({
            data,
            message: "Passanger deleted",
        });
    } catch (error) {
        return next(error);
    }
};

exports.deletePassangerByUserId = async (req, res, next) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            throw {
                statusCode: 400,
                message: "userId is required",
            };
        }

        const data = await passangerUsecase.deletePassangerByUserId(userId);

        return res.status(200).json({
            data,
            message: "Passanger deleted",
        });
    } catch (error) {
        return next(error);
    }
};
