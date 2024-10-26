const {
  HelperBookings,
  Passangers,
  Seats,
  Bookings,
  Payments,
  Flights,
  Airlines,
  Airports,
} = require("../../models");
const { v4: uuidv4 } = require("uuid");

exports.createHelperBooking = async (payload) => {
  const id = uuidv4();

  payload = {
    id,
    ...payload,
  };
  const data = await HelperBookings.create(payload);

  if (!data) {
    throw {
      statusCode: 500,
      message: "Failed to create helper booking",
    };
  }

  return data;
};

exports.getHelperBookingById = async (id) => {
  const opt = {
    include: [Passangers, Seats, Bookings],
  };

  const data = await HelperBookings.findByPk(id, opt);

  if (!data) {
    throw {
      statusCode: 404,
      message: `Helper booking with ID ${id} not found`,
    };
  }

  return data;
};

exports.getHelperBookingByPassangerId = async (passangerId) => {
  const opt = {
    where: {
      passangerId,
    },
    include: [Passangers, Seats, Bookings],
  };

  const data = await HelperBookings.findAll(opt);

  if (!data || data.length === 0) {
    throw {
      statusCode: 404,
      message: `Helper booking with passanger ID ${passangerId} not found`,
    };
  }

  return data;
};

exports.getHelperBookingByBookingId = async (bookingId) => {
  const opt = {
    where: {
      bookingId,
    },
    include: [
      {
        model: Passangers,
      },
      {
        model: Seats,
        include: {
          model: Flights,
          include: [
            {
              model: Airlines,
            },
            {
              model: Airports,
              as: "StartAirport",
            },
            {
              model: Airports,
              as: "EndAirport",
            },
          ],
        },
      },
      {
        model: Bookings,
        include: {
          model: Payments,
        },
      },
    ],
  };

  const data = await HelperBookings.findAll(opt);

  if (!data || data.length === 0) {
    throw {
      statusCode: 404,
      message: `Helper booking with booking ID ${bookingId} not found`,
    };
  }

  return data;
};

exports.getHelperBookingBySeatId = async (seatId) => {
  const opt = {
    where: {
      seatId,
    },
    include: [Passangers, Seats, Bookings],
  };

  const data = await HelperBookings.findAll(opt);

  if (!data || data.length === 0) {
    throw {
      statusCode: 404,
      message: `Helper booking with seat ID ${seatId} not found`,
    };
  }

  return data;
};

exports.getHelperBookingByUserId = async (userId, value) => {
  let whereClause = {};
  if (value != "") {
    whereClause["status"] = value;
  }
  const opt = {
    include: [
      {
        model: Seats,
        include: {
          model: Flights,
          include: [
            {
              model: Airlines,
            },
            {
              model: Airports,
              as: "StartAirport",
            },
            {
              model: Airports,
              as: "EndAirport",
            },
          ],
        },
      },
      {
        model: Bookings,
        where: {
          userId,
        },
        include: {
          model: Payments,
          where: whereClause,
        },
      },
    ],
  };

  const data = await HelperBookings.findAll(opt);

  if (!data || data.length === 0) {
    throw {
      statusCode: 404,
      message: `Helper booking not found`,
    };
  }

  // Use a new Set to store entire booking data objects (assuming uniqueness based on object reference)
  // Create a set to store unique booking IDs
  const uniqueBookingIds = new Set();
  const filteredData = new Set();

  // Extract and add unique booking IDs to the set
  data.forEach((booking) => {
    const bookingId = booking.bookingId; // Assuming bookingId is in Bookings object
    uniqueBookingIds.add(bookingId);
  });

  console.log(uniqueBookingIds);

  // Filter original data based on unique booking IDs
  data.forEach((booking) => {
    if (uniqueBookingIds.has(booking.bookingId)) {
        filteredData.add(booking);
        uniqueBookingIds.delete(booking.bookingId)
    }
  });

  return Array.from(filteredData);
};

exports.updateHelperBooking = async (id, payload) => {
  await this.getHelperBookingById(id);

  const opt = {
    where: {
      id,
    },
    returning: true,
  };

  const data = await HelperBookings.update(payload, opt);

  if (!data) {
    throw {
      statusCode: 500,
      message: "Failed to update helper booking",
    };
  }

  return data[1][0];
};

exports.deleteHelperBookingById = async (id) => {
  const toBeDeleted = await this.getHelperBookingById(id);

  const opt = {
    where: {
      id,
    },
    force: true,
  };

  const data = await HelperBookings.destroy(opt);

  if (!data) {
    throw {
      statusCode: 500,
      message: "Failed to delete helper booking",
    };
  }

  return toBeDeleted;
};

exports.deleteHelperBookingByPassangerId = async (passangerId) => {
  await this.getHelperBookingByPassangerId(passangerId);

  const opt = {
    where: {
      passangerId,
    },
    force: true,
  };

  const data = await HelperBookings.destroy(opt);

  if (!data) {
    throw {
      statusCode: 500,
      message: "Failed to delete helper booking",
    };
  }

  return data;
};

exports.deleteHelperBookingByBookingId = async (bookingId) => {
  await this.getHelperBookingByBookingId(bookingId);

  const opt = {
    where: {
      bookingId,
    },
    force: true,
  };

  const data = await HelperBookings.destroy(opt);

  if (!data) {
    throw {
      statusCode: 500,
      message: "Failed to delete helper booking",
    };
  }

  return data;
};

exports.deleteHelperBookingBySeatId = async (seatId) => {
  await this.getHelperBookingBySeatId(seatId);

  const opt = {
    where: {
      seatId,
    },
    force: true,
  };

  const data = await HelperBookings.destroy(opt);

  if (!data) {
    throw {
      statusCode: 500,
      message: "Failed to delete helper booking",
    };
  }

  return data;
};
