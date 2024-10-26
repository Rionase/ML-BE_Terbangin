const { Airlines } = require("../../models");
const crypto = require("crypto");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const uploader = require("../../helpers/cloudinary");

exports.getAirlines = async () => {
  const data = await Airlines.findAll({});
  return data;
};

exports.getAirline = async (id) => {
  const data = await Airlines.findAll({
    where: {
      id,
    },
  });
  if (data.length) {
    return data;
  }

  return "data not found";
};

exports.getAirlineBySerialNumber = async (serialNumber) => {
  return Airlines.findOne({ where: { serialNumber } });
};

exports.createAirline = async (payload) => {
  payload.id = uuidv4();

  if (payload.picture && typeof payload.picture !== "string") {
    const { picture } = payload;

    picture.publicId = crypto.randomBytes(16).toString("hex");

    picture.name = `${picture.publicId}${path.parse(picture.name).ext}`;

    const imageUpload = await uploader(picture);

    payload.picture = imageUpload.secure_url;
  }
  const data = await Airlines.create(payload);
  return data;
};

exports.updateAirline = async (id, payload) => {
  if (payload.picture) {
    const { picture } = payload;
    picture.publicId = crypto.randomBytes(16).toString("hex");

    picture.name = `${picture.publicId}${path.parse(picture.name).ext}`;

    const imageUpload = await uploader(picture);

    payload.picture = imageUpload.secure_url;
  }

  await Airlines.update(payload, { where: { id } });

  const data = await Airlines.findAll({ where: { id } });
  return data;
};

exports.deleteAirline = async (id) => {
  await Airlines.destroy({ where: { id } });

  return null;
};
