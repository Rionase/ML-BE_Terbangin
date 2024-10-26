const helperBookingUsecase = require("../../usecases/helperBooking");
const isUUID = require("../../helpers/isUUID");

exports.createHelperBooking = async (req, res, next) => {
    try {
        const payload = req.body;

        if (!payload) {
            throw {
                statusCode: 400,
                message: "Payload is required",
            };
        }

        // Validasi passangerId
        if (
            !payload.passangerId ||
            typeof payload.passangerId !== "string" ||
            payload.passangerId.trim() === "" ||
            !isUUID(payload.passangerId)
        ) {
            throw {
                statusCode: 400,
                message: "passangerId cannot be empty and must be a valid UUID",
            };
        }

        // Validasi bookingId
        if (
            !payload.bookingId ||
            typeof payload.bookingId !== "string" ||
            payload.bookingId.trim() === "" ||
            !isUUID(payload.bookingId)
        ) {
            throw {
                statusCode: 400,
                message: "bookingId cannot be empty and must be a valid UUID",
            };
        }

        // Validasi seatId
        if (
            !payload.seatId ||
            typeof payload.seatId !== "string" ||
            payload.seatId.trim() === "" ||
            !isUUID(payload.seatId)
        ) {
            throw {
                statusCode: 400,
                message: "seatId cannot be empty and must be a valid UUID",
            };
        }

        const data = await helperBookingUsecase.createHelperBooking(payload);

        res.status(201).json({
            data,
            message: "Helper booking created",
        });
    } catch (error) {
        next(error);
    }
};

exports.getHelperBookingById = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id || !isUUID(id)) {
            throw {
                statusCode: 400,
                message: "Id must be a valid UUID",
            };
        }

        const data = await helperBookingUsecase.getHelperBookingById(id);

        res.json({
            data,
            message: `Helper booking with id ${id} found`,
        });
    } catch (error) {
        next(error);
    }
};

exports.getHelperBookingByPassangerId = async (req, res, next) => {
    try {
        const { passangerId } = req.params;

        if (!passangerId || !isUUID(passangerId)) {
            throw {
                statusCode: 400,
                message: "PassangerId must be a valid UUID",
            };
        }

        const data = await helperBookingUsecase.getHelperBookingByPassangerId(
            passangerId
        );

        res.json({
            data,
            message: `Helper booking with passangerId ${passangerId} found`,
        });
    } catch (error) {
        next(error);
    }
};

exports.getHelperBookingByBookingId = async (req, res, next) => {
    try {
        const { bookingId } = req.params;

        if (!bookingId || !isUUID(bookingId)) {
            throw {
                statusCode: 400,
                message: "BookingId must be a valid UUID",
            };
        }

        const data = await helperBookingUsecase.getHelperBookingByBookingId(
            bookingId
        );

        res.json({
            data,
            message: `Helper booking with bookingId ${bookingId} found`,
        });
    } catch (error) {
        next(error);
    }
};

exports.getHelperBookingBySeatId = async (req, res, next) => {
    try {
        const { seatId } = req.params;

        if (!seatId || !isUUID(seatId)) {
            throw {
                statusCode: 400,
                message: "SeatId must be a valid UUID",
            };
        }

        const data = await helperBookingUsecase.getHelperBookingBySeatId(
            seatId
        );

        res.json({
            data,
            message: `Helper booking with seatId ${seatId} found`,
        });
    } catch (error) {
        next(error);
    }
};
exports.getHelperBookingByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    let { value } = req.query;
    if (value == undefined) {
        value = ""
    }

    if (!userId || !isUUID(userId)) {
      throw {
        statusCode: 400,
        message: "userId must be a valid UUID",
      };
    }

    const data = await helperBookingUsecase.getHelperBookingByUserId(
      userId,
      value.toUpperCase()
    );

    res.json({
      data,
      message: `Helper booking found`,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateHelperBooking = async (req, res, next) => {
    try {
        const { id } = req.params;
        const payload = req.body;

        if (!id || !isUUID(id)) {
            throw {
                statusCode: 400,
                message: "Id must be a valid UUID",
            };
        }

        if (!payload || Object.keys(payload).length === 0) {
            throw {
                statusCode: 400,
                message: "Payload is required to update helper booking",
            };
        }

        if (payload.passangerId && !isUUID(payload.passangerId)) {
            throw {
                statusCode: 400,
                message: "passangerId must be a valid UUID",
            };
        }

        if (payload.bookingId && !isUUID(payload.bookingId)) {
            throw {
                statusCode: 400,
                message: "bookingId must be a valid UUID",
            };
        }

        if (payload.seatId && !isUUID(payload.seatId)) {
            throw {
                statusCode: 400,
                message: "seatId must be a valid UUID",
            };
        }

        const data = await helperBookingUsecase.updateHelperBooking(
            id,
            payload
        );

        res.json({
            data,
            message: "Helper booking updated",
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteHelperBookingById = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id || !isUUID(id)) {
            throw {
                statusCode: 400,
                message: "Id must be a valid UUID",
            };
        }

        const data = await helperBookingUsecase.deleteHelperBookingById(id);

        res.json({
            data,
            message: `Helper booking with id ${id} deleted`,
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteHelperBookingByPassangerId = async (req, res, next) => {
    try {
        const { passangerId } = req.params;

        if (!passangerId || !isUUID(passangerId)) {
            throw {
                statusCode: 400,
                message: "PassangerId must be a valid UUID",
            };
        }

        const data =
            await helperBookingUsecase.deleteHelperBookingByPassangerId(
                passangerId
            );

        res.json({
            data,
            message: `Helper booking with passangerId ${passangerId} deleted`,
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteHelperBookingByBookingId = async (req, res, next) => {
    try {
        const { bookingId } = req.params;

        if (!bookingId || !isUUID(bookingId)) {
            throw {
                statusCode: 400,
                message: "BookingId must be a valid UUID",
            };
        }

        const data = await helperBookingUsecase.deleteHelperBookingByBookingId(
            bookingId
        );

        res.json({
            data,
            message: `Helper booking with bookingId ${bookingId} deleted`,
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteHelperBookingBySeatId = async (req, res, next) => {
    try {
        const { seatId } = req.params;

        if (!seatId || !isUUID(seatId)) {
            throw {
                statusCode: 400,
                message: "SeatId must be a valid UUID",
            };
        }

        const data = await helperBookingUsecase.deleteHelperBookingBySeatId(
            seatId
        );

        res.json({
            data,
            message: `Helper booking with seatId ${seatId} deleted`,
        });
    } catch (error) {
        next(error);
    }
};
