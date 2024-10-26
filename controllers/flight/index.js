const flightusecase = require("../../usecases/flight/index");
const { v4: uuidv4 } = require("uuid");
const isUUID = require("../../helpers/isUUID");
const lodash = require("lodash");

exports.getFlights = async (req, res, next) => {
  try {
    const data = await flightusecase.getFlights();

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getFlightsbyContinent = async (req, res, next) => {
  try {
    let { value, continent } = req.query;
    key = "departureAt"

    if (!value || value == "") {
      return next({
        message: "value departure At cannot be empty",
        statusCode: 400,
      });
    }
    if (!continent || continent == "") {
      return next({
        message: "continent cannot be empty",
        statusCode: 400,
      });
    }

    const data = await flightusecase.getFlightsbyContinent(
      key,
      value,
      lodash.startCase(lodash.toLower(continent))
    );

    if (!data) {
      return next({
        message: `Flight is not found!`,
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

exports.getFlightsbyFilter = async (req, res, next) => {
  try {
    let { key, value, filter, order, start, end, seatType } = req.query;
    const list = [
      "flightCode",
      "priceEconomy",
      "priceBussines",
      "priceFirstClass",
      "departureAt",
      "arrivalAt",
      "duration",
    ];

    const listuuidtable = ["airlineId", "startAirportId", "endAirportId"];

    if (!start || start == "") {
      return next({
        message: "start city cannot be empty",
        statusCode: 400,
      });
    }

    if (!end || end == "") {
      return next({
        message: "end city cannot be empty",
        statusCode: 400,
      });
    }

    if (!filter) {
      filter = "priceEconomy";
    }
    if (!list.includes(filter)) {
      return next({
        message: "filter must include in selection and cannot be empty",
        statusCode: 400,
      });
    }

    if (!order) {
      order = "asc";
    }
    if (!(order.toLowerCase() == "asc" || order.toLowerCase() == "desc")) {
      return next({
        message: "order must be ASC or DESC",
        statusCode: 400,
      });
    }

    if (listuuidtable.includes(key)) {
      if (!isUUID(value)) {
        return next({
          statusCode: 400,
          message: "userId must be a valid UUID",
        });
      }
    }

    if (!seatType) {
      seatType = "economy";
    }
    const validTypes = ["economy", "bussines", "firstclass"];
    if (!validTypes.includes(seatType.toLowerCase())) {
      throw {
        statusCode: 400,
        message: "type must be one of Economy, Bussines, Firstclass",
      };
    }

    const data = await flightusecase.getFlightsbyFilter(
      key,
      value,
      filter,
      order,
      start,
      end,
      seatType.toLowerCase()
    );

    if (!data) {
      return next({
        message: `Flight is not found!`,
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

exports.getFlightbyId = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isUUID(id)) {
      return next({
        statusCode: 400,
        message: "userId must be a valid UUID",
      });
    }

    const data = await flightusecase.getFlightbyId(id);

    if (!data) {
      return next({
        message: `Flight with this id :${id} is not found!`,
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

exports.createFlight = async (req, res, next) => {
  try {
    const id = uuidv4();
    const {
      airlineId,
      flightCode,
      duration,
      startAirportId,
      endAirportId,
      departureAt,
      arrivalAt,
      priceEconomy,
      priceBussines,
      priceFirstClass,
      capacityEconomy,
      capacityBussines,
      capacityFirstClass,
    } = req.body;
    if (!airlineId || airlineId == "") {
      return next({
        message: "Airline id must be provided!",
        statusCode: 400,
      });
    }
    if (!flightCode || flightCode == "") {
      return next({
        message: "Flight code must be provided!",
        statusCode: 400,
      });
    }
    if (!duration || duration == "") {
      return next({
        message: "Duration must be provided!",
        statusCode: 400,
      });
    }
    if (!startAirportId || startAirportId == "") {
      return next({
        message: "startAirportId must be provided!",
        statusCode: 400,
      });
    }
    if (!endAirportId || endAirportId == "") {
      return next({
        message: "endAirportId must be provided!",
        statusCode: 400,
      });
    }
    if (!departureAt || departureAt == "") {
      return next({
        message: "departureAt must be provided!",
        statusCode: 400,
      });
    }
    if (!arrivalAt || arrivalAt == "") {
      return next({
        message: "arrivalAt must be provided!",
        statusCode: 400,
      });
    }
    if (!priceEconomy || priceEconomy == "") {
      return next({
        message: "priceEconomy must be provided!",
        statusCode: 400,
      });
    }
    if (!priceBussines || priceBussines == "") {
      return next({
        message: "priceBussines must be provided!",
        statusCode: 400,
      });
    }
    if (!priceFirstClass || priceFirstClass == "") {
      return next({
        message: "priceFirstClass must be provided!",
        statusCode: 400,
      });
    }
    if (!capacityFirstClass || capacityFirstClass == "") {
      return next({
        message: "capacityFirstClass must be provided!",
        statusCode: 400,
      });
    }
    if (!capacityEconomy || capacityEconomy == "") {
      return next({
        message: "capacityEconomy must be provided!",
        statusCode: 400,
      });
    }
    if (!capacityBussines || capacityBussines == "") {
      return next({
        message: "capacityBussines must be provided!",
        statusCode: 400,
      });
    }

    const data = await flightusecase.createFlight({
      id,
      airlineId,
      flightCode,
      duration,
      startAirportId,
      endAirportId,
      departureAt,
      arrivalAt,
      priceEconomy,
      priceBussines,
      priceFirstClass,
      capacityEconomy,
      capacityBussines,
      capacityFirstClass,
    });

    res.status(201).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.decrementFlightCapacity = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { seatclass, value } = req.body;

    if (!isUUID(id)) {
      return next({
        statusCode: 400,
        message: "userId must be a valid UUID",
      });
    }

    const data = await flightusecase.decrementFlightCapacity(
      seatclass,
      value,
      id
    );

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateFlight = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isUUID(id)) {
      return next({
        statusCode: 400,
        message: "userId must be a valid UUID",
      });
    }
    const {
      airlineId,
      flightCode,
      duration,
      startAirportId,
      endAirportId,
      departureAt,
      arrivalAt,
      priceEconomy,
      priceBussines,
      priceFirstClass,
      capacityEconomy,
      capacityBussines,
      capacityFirstClass,
    } = req.body;

    if (!airlineId || airlineId == "") {
      return next({
        message: "Airline id must be provided!",
        statusCode: 400,
      });
    }
    if (!flightCode || flightCode == "") {
      return next({
        message: "Flight code must be provided!",
        statusCode: 400,
      });
    }
    if (!duration || duration == "") {
      return next({
        message: "Duration must be provided!",
        statusCode: 400,
      });
    }
    if (!startAirportId || startAirportId == "") {
      return next({
        message: "startAirportId must be provided!",
        statusCode: 400,
      });
    }
    if (!endAirportId || endAirportId == "") {
      return next({
        message: "endAirportId must be provided!",
        statusCode: 400,
      });
    }
    if (!departureAt || departureAt == "") {
      return next({
        message: "departureAt must be provided!",
        statusCode: 400,
      });
    }
    if (!arrivalAt || arrivalAt == "") {
      return next({
        message: "arrivalAt must be provided!",
        statusCode: 400,
      });
    }
    if (!priceEconomy || priceEconomy == "") {
      return next({
        message: "priceEconomy must be provided!",
        statusCode: 400,
      });
    }
    if (!priceBussines || priceBussines == "") {
      return next({
        message: "priceBussines must be provided!",
        statusCode: 400,
      });
    }
    if (!priceFirstClass || priceFirstClass == "") {
      return next({
        message: "priceFirstClass must be provided!",
        statusCode: 400,
      });
    }
    if (!capacityFirstClass || capacityFirstClass == "") {
      return next({
        message: "capacityFirstClass must be provided!",
        statusCode: 400,
      });
    }
    if (!capacityEconomy || capacityEconomy == "") {
      return next({
        message: "capacityEconomy must be provided!",
        statusCode: 400,
      });
    }
    if (!capacityBussines || capacityBussines == "") {
      return next({
        message: "capacityBussines must be provided!",
        statusCode: 400,
      });
    }

    const data = await flightusecase.updateFlight(id, {
      airlineId,
      flightCode,
      duration,
      startAirportId,
      endAirportId,
      departureAt,
      arrivalAt,
      priceEconomy,
      priceBussines,
      priceFirstClass,
      capacityEconomy,
      capacityBussines,
      capacityFirstClass,
    });

    if (!data) {
      return next({
        message: `Flight with this id :${id} is not found!`,
        statusCode: 404,
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

exports.deleteFlight = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isUUID(id)) {
      return next({
        statusCode: 400,
        message: "userId must be a valid UUID",
      });
    }
    const data = await flightusecase.deleteFlight(id);

    if (!data) {
      return next({
        message: `Flight with this id :${id} is not found!`,
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
