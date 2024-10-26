const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sendEmail = require("../../config/emailConfig");
const {
    getUserByEmail: findUserByEmail,
    getUserById: findUserById,
} = require("../../repositories/user");
const { createToken, findToken } = require("../../repositories/verification");
const template = require("../../helpers/templateHTML");

exports.generateLink = async (email) => {
    const user = await findUserByEmail(email);

    if (!user) {
        throw {
            statusCode: 400,
            message: "Email not registered",
        };
    }

    const token = jwt.sign(
        { email: user.email },
        process.env.JWT_SECRET_VERIFICATION_LINK,
        { expiresIn: "20m" }
    );

    await createToken({
        id: uuidv4(),
        token,
        status: false,
        userId: user.id,
    });

    const link = `${process.env.CLIENT_URL}/verify-link?token=${token}`;
    const html = template.verifyLink(link);

    await sendEmail({
        to: email,
        subject: "Verification Link for Reset Password",
        html,
    });

    return { token, linkReset: link };
};

exports.verifyLink = async (token) => {
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET_VERIFICATION_LINK);
    } catch (err) {
        throw {
            statusCode: 400,
            message: "Invalid or expired token",
        };
    }

    const user = await findUserByEmail(decoded.email);
    const verificationToken = await findToken({ token, userId: user.id });

    if (!verificationToken || verificationToken.status) {
        throw {
            statusCode: 400,
            message: "Link is already used or expired",
        };
    }

    if (user?.dataValues?.password) {
        delete user.dataValues.password;
    } else {
        delete user.password;
    }

    return user;
};

exports.updatePassword = async (userId, token, newPassword) => {
    const user = await findUserById(userId);
    const verificationToken = await findToken({
        token,
        userId,
        status: false,
    });

    if (!user || !verificationToken) {
        throw {
            statusCode: 400,
            message: "Invalid user ID or token",
        };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await user.update({
        password: hashedPassword,
    });

    if (updatedUser?.dataValues?.password) {
        delete updatedUser.dataValues.password;
    } else {
        delete updatedUser.password;
    }

    await verificationToken.update({ status: true });

    return updatedUser;
};
