const { Bookings, Users, Payments } = require("../../models");
const { v4: uuidv4 } = require("uuid");

exports.getBookings = async () => {
    const data = await Bookings.findAll({
        include: [
            {
                model: Users,
            },
            {
                model: Payments,
            },
        ],
    });
    return data;
};

exports.getBookingById = async (id) => {
    const data = await Bookings.findAll({
        where: {
            id,
        },
        include: [
            {
                model: Users,
            },
            {
                model: Payments,
            },
        ],
    });
    if (data.length) {
        return data;
    }

    return "data not found";
};

exports.getBookingsByPaymentId = async (paymentId) => {
    return Bookings.findAll({
        where: {
            paymentId,
        },
    });
};

exports.getBookingByUserIdAndPaymentId = async (userId, paymentId) => {
    return Bookings.findAll({
        where: {
            userId,
            paymentId,
        },
    });
};

exports.createBooking = async (payload) => {
    const id = uuidv4();
    const bookingCode = `${id.slice(id.length - 9).toUpperCase()}`;
    payload = {
        id,
        bookingCode,
        ...payload,
    };

    const data = await Bookings.create(payload);
    return data;
};

exports.updateBooking = async (id, payload) => {
    const options = {
        where: { id },
        returning: true,
    };
    const data = await Bookings.update(payload, options);

    return data[1][0];
};

exports.deleteBooking = async (id) => {
    const options = {
        where: { id },
    };
    await Bookings.destroy(options);

    return null;
};
