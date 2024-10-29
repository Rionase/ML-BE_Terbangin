const { Flights, Airlines, Airports } = require("../../models");
const { Op, where, Sequelize } = require("sequelize");
const moment = require("moment");

exports.getFlights = async () => {
  const data = await Flights.findAll({
    limit: 20,
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
  });

  return data;
};

exports.getFlightsbyFilter = async (
  key,
  value,
  filter,
  order,
  start,
  end,
  seatType
) => {
  let whereClause = {};
  console.log(seatType);
  if (seatType) {
    let capacityField;
    switch (seatType.toLowerCase()) {
      case "economy":
        capacityField = "capacityEconomy";
        break;
      case "bussines":
        capacityField = "capacityBussines";
        break;
      case "firstclass":
        capacityField = "capacityFirstClass";
        break;
      default:
        throw new Error("Invalid seat type");
    }
    whereClause[capacityField] = {
      [Op.not]: 0,
    };
  }

  if (key && value) {
    if (key === "departureAt") {
      const startDate = moment(value).startOf("day").toDate();
      const endDate = moment(value).endOf("day").toDate();
      whereClause[key] = { [Op.between]: [startDate, endDate] };
    } else {
      whereClause[key] = value;
    }
  }

  const data = await Flights.findAll({
    order: [[filter, order]],
    where: whereClause,
    include: [
      {
        model: Airlines,
      },
      {
        model: Airports,
        as: "StartAirport",
        where: {
          city: start,
        },
      },
      {
        model: Airports,
        as: "EndAirport",
        where: {
          city: end,
        },
      },
    ],
  });

  if (data.length) {
    data.forEach((flight) => {
      flight.dataValues.departureAt = moment(
        flight.dataValues.departureAt
      ).format("YYYY-MM-DD HH:mm:ss");
      flight.dataValues.arrivalAt = moment(flight.dataValues.arrivalAt).format(
        "YYYY-MM-DD HH:mm:ss"
      );
    });
    return data;
  }
  return null;
};

exports.getFlightsbyContinent = async (key, value, continent) => {
  let whereClause = {};

  whereClause['capacityEconomy'] = {
    [Op.not]: 0,
  };

  if (key && value) {
    if (key === "departureAt") {
      const startDate = moment(value).startOf("day").toDate();
      whereClause[key] = { [Op.gte]: startDate };
    } else {
      whereClause[key] = value;
    }
  }

  const data = await Flights.findAll({
    order: [["priceEconomy", "ASC"]],
    limit:4,
    where: whereClause,
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
        where: {
          continent: continent,
        },
      },
    ],
  });

  if (data.length) {
    data.forEach((flight) => {
      flight.dataValues.departureAt = moment(
        flight.dataValues.departureAt
      ).format("YYYY-MM-DD HH:mm:ss");
      flight.dataValues.arrivalAt = moment(flight.dataValues.arrivalAt).format(
        "YYYY-MM-DD HH:mm:ss"
      );
    });
    return data;
  }
  return null;
};

exports.getFlightbyId = async (id) => {
  const data = await Flights.findAll({
    where: {
      id,
    },
    include: [
      {
        model: Airlines,
      },
      { model: Airports, as: "StartAirport" },
      { model: Airports, as: "EndAirport" },
    ],
  });

  if (data.length) {
    return data;
  }
  return null;
};

exports.createFlight = async (payload) => {
  const data = await Flights.create(payload);
  return data;
};

exports.decrementFlightCapacity = async (seatclass, value, id) => {
  let kelas = "";
  switch (seatclass) {
    case "FIRST_CLASS":
      kelas = "FirstClass";
      break;
    case "BUSINESS":
      kelas = "Bussines";
      break;
    default:
    kelas = "Economy";
  }

  const flight = await Flights.findOne({
    where: { id: id },
    attributes: ["capacity" + kelas],
  });

  if (!flight) {
    throw new Error(`Flight dengan ID ${id} tidak ditemukan.`);
  }

  const currentCapacity = flight["capacity" + kelas];
  if (currentCapacity < value) {
    throw new Error(
      `Tidak bisa mengurangi kapasitas sebanyak ${value} karena hanya ada ${currentCapacity} kursi yang tersedia.`
    );
  }

  await Flights.increment(
    { ["capacity" + kelas]: -value },
    { where: { id: id } }
  );

  return `capacity telah berhasil di kurangi sebanyak ${value}`;
};

exports.updateFlight = async (id, payload) => {
  await Flights.update(payload, {
    where: {
      id,
    },
  });

  const data = await Flights.findAll({
    where: {
      id,
    },
    include: [
      {
        model: Airlines,
      },
      { model: Airports, as: "StartAirport" },
      { model: Airports, as: "EndAirport" },
    ],
  });

  return data;
};

exports.deleteFlight = async (id) => {
  // delete from postgres
  await Flights.destroy({ where: { id } });

  return null;
};

exports.recomendationFlight = async (recomendationIdArray, page) => {
  const now = new Date(); // Get current date and time

  let result = []

  if ( recomendationIdArray.length > 0 ) {
    const recomendationData = await Flights.findAll({
      where: {
        deletedAt: null,
        [Op.and]: [
          { id: { [Op.in]: recomendationIdArray } },
          { departureAt: { [Op.gt]: new Date() } }  // Make sure to use the current date
        ]
      },
      include: [
        { model: Airlines, required: false, where: { deletedAt: null } },
        { model: Airports, as: 'StartAirport', required: false, where: { deletedAt: null } },
        { model: Airports, as: 'EndAirport', required: false, where: { deletedAt: null } }
      ],
      order: [
        [
          Sequelize.literal(`FIELD(Flights.id, ${recomendationIdArray.map(id => `'${id}'`).join(', ')})`),
          'ASC'
        ],  // Add this to order by departureAt after prioritizing IDs
      ],
      limit: 8,
      offset: page * 8
    });
  
    result = [...recomendationData]
  }

  if ( result.length < 8 ) {

    let limit = 8 - result.length
    let offset = page * 8
    if ( recomendationIdArray.length > 0 ) {
      offset = page - ( Math.floor(recomendationIdArray.length / 8) )
    }

    const otherFlights = await Flights.findAll({
      where: {
        deletedAt: null,
        id: { [Op.notIn]: recomendationIdArray },  // Exclude flights in recomendationIdArray
        departureAt: { [Op.gt]: new Date() }       // Only flights with departureAt in the future
      },
      include: [
        { model: Airlines, required: false, where: { deletedAt: null } },
        { model: Airports, as: 'StartAirport', required: false, where: { deletedAt: null } },
        { model: Airports, as: 'EndAirport', required: false, where: { deletedAt: null } }
      ],
      order: Sequelize.literal('priceEconomy ASC'),
      limit: limit,
      offset: offset * 8
    });

    result = [...result, ...otherFlights]
  }
  
  return result;

}
