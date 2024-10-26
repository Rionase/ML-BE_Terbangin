const Airportusecase = require("../../usecases/airport");

exports.getAirports = async (req, res, next) => {
    try {
        const data = await Airportusecase.getAirports();

        res.status(200).json({
            message: "Successs",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.getAirport = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await Airportusecase.getAirport(id);
        if (!data) {
            return next({
                message: `Airport with id ${id} is not found!`,
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

exports.createAirport = async (req, res, next) => {
    try {
        const { name, iataCode, terminal, city, country, continent } = req.body;
        const picture = req?.files?.picture;
        if (!name || name == "") {
            return next({
                message: "name must be provided!",
                statusCode: 400,
            });
        }
        if (!iataCode || iataCode == "") {
            return next({
                message: "iataCode must be provided!",
                statusCode: 400,
            });
        }
        if (!terminal || terminal == "") {
            return next({
                message: "terminal must be provided!",
                statusCode: 400,
            });
        }
        if (!city || city == "") {
            return next({
                message: "city must be provided!",
                statusCode: 400,
            });
        }
        if (!country || country == "") {
            return next({
                message: "country must be provided!",
                statusCode: 400,
            });
        }
        if (!continent || continent == "") {
            return next({
                message: "continent must be provided!",
                statusCode: 400,
            });
        }

        const data = await Airportusecase.createAirport({
            name,
            iataCode,
            terminal,
            city,
            country,
            continent,
            picture,
        });

        res.status(200).json({
            message: "Successs",
            data,
        });
    } catch (error) {
        next(error);
    }
};
exports.updateAirport = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, iataCode, terminal, city, country, continent } = req.body;
        const picture = req?.files?.picture;
        if (!name || name == "") {
            return next({
                message: "name must be provided!",
                statusCode: 400,
            });
        }
        if (!iataCode || iataCode == "") {
            return next({
                message: "iataCode must be provided!",
                statusCode: 400,
            });
        }
        if (!terminal || terminal == "") {
            return next({
                message: "terminal must be provided!",
                statusCode: 400,
            });
        }
        if (!city || city == "") {
            return next({
                message: "city must be provided!",
                statusCode: 400,
            });
        }
        if (!country || country == "") {
            return next({
                message: "country must be provided!",
                statusCode: 400,
            });
        }
        if (!continent || continent == "") {
            return next({
                message: "continent must be provided!",
                statusCode: 400,
            });
        }

        const data = await Airportusecase.updateAirport(id, {
            name,
            iataCode,
            terminal,
            city,
            country,
            continent,
            picture,
        });

        res.status(200).json({
            message: "Successs",
            data,
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteAirport = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await Airportusecase.deleteAirport(id);

        res.status(200).json({
            message: "Successs",
            data,
        });
    } catch (error) {
        next(error);
    }
};
