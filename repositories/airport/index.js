const { Airports } = require("../../models");
const crypto = require("crypto");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const uploader = require("../../helpers/cloudinary");

exports.getAirports = async () => {
    const data = await Airports.findAll();
    return data;
};

exports.getAirport = async (id) => {
    const data = await Airports.findAll({
        where: {
            id,
        },
    });
    if (data.length) {
        return data;
    }

    return "data not found";
};

exports.createAirport = async (payload) => {
    payload.id = uuidv4();

    if (payload.picture && typeof payload.picture !== "string") {
        const { picture } = payload;

        picture.publicId = crypto.randomBytes(16).toString("hex");

        picture.name = `${picture.publicId}${path.parse(picture.name).ext}`;

        const imageUpload = await uploader(picture);

        payload.picture = imageUpload.secure_url;
    }
    const data = await Airports.create(payload);
    return data;
};

exports.updateAirport = async (id, payload) => {
    if (payload.picture) {
        const { picture } = payload;
        picture.publicId = crypto.randomBytes(16).toString("hex");

        picture.name = `${picture.publicId}${path.parse(picture.name).ext}`;

        const imageUpload = await uploader(picture);

        payload.picture = imageUpload.secure_url;
    }

    await Airports.update(payload, { where: { id } });

    const data = await Airports.findAll({ where: { id } });
    return data;
};

exports.deleteAirport = async (id) => {
    await Airports.destroy({ where: { id } });

    return null;
};
