const pessangerRepo = require("../../repositories/passanger");

exports.createPassanger = async (payload) => {
    const data = await pessangerRepo.createPassanger(payload);

    return data;
};

exports.getPassangerById = async (id) => {
    const data = await pessangerRepo.getPassangerById(id);

    return data;
};

exports.getPassangerByUserId = async (userId) => {
    const data = await pessangerRepo.getPassangerByUserId(userId);

    return data;
};

exports.updatePassanger = async (payload, id) => {
    const data = await pessangerRepo.updatePassanger(payload, id);

    return data;
};

exports.deletePassanger = async (id) => {
    const data = await pessangerRepo.deletePassanger(id);

    return data;
};

exports.deletePassangerByUserId = async (userId) => {
    const data = await pessangerRepo.deletePassangerByUserId(userId);

    return data;
};
