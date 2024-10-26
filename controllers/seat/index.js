const seatUsecase = require("../../usecases/seat/index");
const { v4: uuidv4 } = require("uuid");
const isUUID = require("../../helpers/isUUID");

exports.getSeats = async (req, res, next) => {
    try {
        const data = await seatUsecase.getSeats();

        res.status(200).json({
            message: "Successs",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.getSeatbyId = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isUUID(id)) {
      return next({
        statusCode: 400,
        message: "userId must be a valid UUID",
      });
    }
    const data = await seatUsecase.getSeatbyId(id);
    if (!data) {
      return next({
        message: `Seat with id ${id} is not found!`,
        statusCode: 404,
      });
    }

        res.status(200).json({
            message: "Successs",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.getSeatbyFlight = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await seatUsecase.getSeatbyFlight(id);
    if (!data) {
      return next({
        message: `Seat with ticket-id:${id} is not found!`,
        statusCode: 404,
      });
    }

        res.status(200).json({
            message: "Successs",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.createSeat = async (req, res, next) => {
    try {
        const id = uuidv4();
        const { flightId, seatNumber, airlineClass, isAvailable } = req.body;
        if (!flightId || flightId == "") {
            return next({
                message: "flight id must be provided!",
                statusCode: 400,
            });
        }
        if (!seatNumber || seatNumber == "") {
            return next({
                message: "seat Number must be provided!",
                statusCode: 400,
            });
        }
        if (!airlineClass || airlineClass == "") {
            return next({
                message: "airlineClass must be provided!",
                statusCode: 400,
            });
        }
        if (!(isAvailable == false || isAvailable == true)) {
            return next({
                message: "status isAvailable must be provided!",
                statusCode: 400,
            });
        }

        const data = await seatUsecase.createSeat({
            id,
            flightId,
            seatNumber,
            airlineClass,
            isAvailable,
        });

        res.status(201).json({
            message: "Successs",
            data,
        });
    } catch (error) {
        next(error);
    }
};
exports.updateSeat = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!isUUID(id)) {
            return next({
                statusCode: 400,
                message: "userId must be a valid UUID",
            });
        }
        const { flightId, seatNumber, airlineClass, isAvailable } = req.body;
        if (!flightId || flightId == "") {
            return next({
                message: "Flight id must be provided!",
                statusCode: 400,
            });
        }
        if (!seatNumber || seatNumber == "") {
            return next({
                message: "seat Number must be provided!",
                statusCode: 400,
            });
        }
        if (!airlineClass || airlineClass == "") {
            return next({
                message: "airlineClass must be provided!",
                statusCode: 400,
            });
        }
        if (!(isAvailable == false || isAvailable == true)) {
            return next({
                message: "status isAvailable must be provided!",
                statusCode: 400,
            });
        }

        const data = await seatUsecase.updateSeat(id, {
            flightId,
            seatNumber,
            airlineClass,
            isAvailable,
        });

        if (isAvailable == false || isAvailable == true) {
            req.io.emit("seatsUpdate", {
                message: "Seats Update",
            });
        }

        res.status(201).json({
            message: "Successs",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteSeat = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!isUUID(id)) {
            return next({
                statusCode: 400,
                message: "userId must be a valid UUID",
            });
        }
        const data = await seatUsecase.deleteSeat(id);

        res.status(200).json({
            message: "Successs",
            data,
        });
    } catch (error) {
        next(error);
    }
};
exports.deleteSeatbyFlight = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!isUUID(id)) {
            return next({
                statusCode: 400,
                message: "userId must be a valid UUID",
            });
        }
        const data = await seatUsecase.deleteSeatbyFlight(id);

        res.status(200).json({
            message: "Successs",
            data,
        });
    } catch (error) {
        next(error);
    }
};
