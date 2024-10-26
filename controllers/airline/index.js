const Airlineusecase = require("../../usecases/airline");

exports.getAirlines = async (req, res, next) => {
    try {
        const data = await Airlineusecase.getAirlines();

        res.status(200).json({
            message: "Successs",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.getAirline = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await Airlineusecase.getAirline(id);
        if (!data) {
            return next({
                message: `Airline with id ${id} is not found!`,
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

exports.createAirline = async (req, res, next) => {
    try {
        const {
            aircraftType,
            name,
            iataCode,
            baggage,
            cabinBaggage,
            additionals,
        } = req.body;
        const picture = req?.files?.picture;
        if (!aircraftType || aircraftType == "") {
            return next({
                message: "aircraft type must be provided!",
                statusCode: 400,
            });
        }
        if (!name || name == "") {
            return next({
                message: "name must be provided!",
                statusCode: 400,
            });
        }
        if (!iataCode || iataCode == "") {
            return next({
                message: "iata code must be provided!",
                statusCode: 400,
            });
        }
        if (!baggage || baggage == "") {
            return next({
                message: "baggage must be provided!",
                statusCode: 400,
            });
        }
        if (!cabinBaggage || cabinBaggage == "") {
            return next({
                message: "cabin baggage must be provided!",
                statusCode: 400,
            });
        }
        const data = await Airlineusecase.createAirline({
            aircraftType,
            name,
            iataCode,
            picture,
            baggage,
            cabinBaggage,
            additionals,
        });

        res.status(200).json({
            message: "Successs",
            data,
        });
    } catch (error) {
        next(error);
    }
};
exports.updateAirline = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            aircraftType,
            name,
            iataCode,
            baggage,
            cabinBaggage,
            additionals,
        } = req.body;
        const picture = req?.files?.picture;
        if (!aircraftType || aircraftType == "") {
            return next({
                message: "aircraft type must be provided!",
                statusCode: 400,
            });
        }
        if (!name || name == "") {
            return next({
                message: "name must be provided!",
                statusCode: 400,
            });
        }
        if (!iataCode || iataCode == "") {
            return next({
                message: "iata code must be provided!",
                statusCode: 400,
            });
        }
        if (!baggage || baggage == "") {
            return next({
                message: "baggage must be provided!",
                statusCode: 400,
            });
        }
        if (!cabinBaggage || cabinBaggage == "") {
            return next({
                message: "cabin baggage must be provided!",
                statusCode: 400,
            });
        }
        const data = await Airlineusecase.updateAirline(id, {
            aircraftType,
            name,
            iataCode,
            picture,
            baggage,
            cabinBaggage,
            additionals,
        });

        res.status(200).json({
            message: "Successs",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteAirline = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await Airlineusecase.deleteAirline(id);

        res.status(200).json({
            message: "Successs",
            data,
        });
    } catch (error) {
        next(error);
    }
};
