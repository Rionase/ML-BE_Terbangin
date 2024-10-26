const helperBookingRepo = require("../../repositories/helperBooking");

exports.createHelperBooking = async (payload) => {
    const data = await helperBookingRepo.createHelperBooking(payload);

    return data;
};

exports.getHelperBookingById = async (id) => {
    const data = await helperBookingRepo.getHelperBookingById(id);

    return data;
};

exports.getHelperBookingByPassangerId = async (passangerId) => {
    const data = await helperBookingRepo.getHelperBookingByPassangerId(
        passangerId
    );

    return data;
};

exports.getHelperBookingByBookingId = async (bookingId) => {
    const data = await helperBookingRepo.getHelperBookingByBookingId(bookingId);

    return data;
};

exports.getHelperBookingBySeatId = async (seatId) => {
    const data = await helperBookingRepo.getHelperBookingBySeatId(seatId);

    return data;
};

exports.getHelperBookingByUserId = async (userId,value) => {
  const data = await helperBookingRepo.getHelperBookingByUserId(userId,value);

  return data;
};

exports.updateHelperBooking = async (payload, id) => {
    const data = await helperBookingRepo.updateHelperBooking(payload, id);

    return data;
};

exports.deleteHelperBookingById = async (id) => {
    const data = await helperBookingRepo.deleteHelperBookingById(id);

    return data;
};

exports.deleteHelperBookingByPassangerId = async (passangerId) => {
    const data = await helperBookingRepo.deleteHelperBookingByPassangerId(
        passangerId
    );

    return data;
};

exports.deleteHelperBookingByBookingId = async (bookingId) => {
    const data = await helperBookingRepo.deleteHelperBookingByBookingId(
        bookingId
    );

    return data;
};

exports.deleteHelperBookingBySeatId = async (seatId) => {
    const data = await helperBookingRepo.deleteHelperBookingBySeatId(seatId);

    return data;
};
