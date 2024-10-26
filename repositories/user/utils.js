const crypto = require("crypto");
const path = require("path");
const uploader = require("../../helpers/cloudinary");

exports.processProfilePicture = async (picture) => {
    /**
     * process the photo given and upload it to cloudinary
     */
    // make unique file name
    picture.publicId = crypto.randomBytes(16).toString("hex");

    // rename file
    picture.name = `${picture.publicId}${path.parse(picture.name).ext}`;

    const imageUpload = await uploader(picture);
    return imageUpload.secure_url;
};
