const { Passangers, Users } = require("../../models");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

exports.createPassanger = async (payload) => {
    const id = uuidv4();
    payload.birthDate = new Date(payload.birthDate);

    payload = {
        id,
        ...payload,
    };
    const data = await Passangers.create(payload);

    if (!data) {
        throw {
            statusCode: 500,
            message: "Failed to create passanger",
        };
    }

    data.dataValues.birthDate = moment(data.dataValues.birthDate).format(
        "YYYY-MM-DD"
    );

    return data;
};

exports.getPassangerById = async (id) => {
    const opt = {
        include: [Users],
    };

    let data = await Passangers.findByPk(id, opt);

    if (!data) {
        throw {
            statusCode: 404,
            message: `Passanger with ID ${id} not found`,
        };
    }

    data.dataValues.birthDate = moment(data.dataValues.birthDate).format(
        "YYYY-MM-DD"
    );

    return data;
};

exports.getPassangerByUserId = async (userId) => {
    const opt = {
        where: {
            userId,
        },
        include: [Users],
    };

    const data = await Passangers.findAll(opt);

    if (!data || data.length === 0) {
        throw {
            statusCode: 404,
            message: `Passanger with user ID ${userId} not found`,
        };
    }

    data.forEach((passanger) => {
        passanger.dataValues.birthDate = moment(passanger.birthDate).format(
            "YYYY-MM-DD"
        );
    });

    return data;
};

exports.updatePassanger = async (payload, id) => {
    await this.getPassangerById(id);

    const opt = {
        where: { id },
        returning: true,
    };

    const data = await Passangers.update(payload, opt);

    if (!data[0]) {
        throw {
            statusCode: 500,
            message: "Failed to update passanger",
        };
    }

    data[1][0].dataValues.birthDate = moment(
        data[1][0].dataValues.birthDate
    ).format("YYYY-MM-DD");

    return data[1][0];
};

exports.deletePassanger = async (id) => {
    const toBeDeleted = await this.getPassangerById(id);

    const opt = {
        where: { id },
        force: true,
    };

    const data = await Passangers.destroy(opt);

    if (!data) {
        throw {
            statusCode: 500,
            message: "Failed to delete passanger",
        };
    }

    return toBeDeleted;
};

exports.deletePassangerByUserId = async (userId) => {
    await this.getPassangerByUserId(userId);

    const opt = {
        where: { userId },
        force: true,
    };

    const data = await Passangers.destroy(opt);

    if (!data) {
        throw {
            statusCode: 500,
            message: `Failed to delete passanger with user ID ${userId}`,
        };
    }

    return data;
};
