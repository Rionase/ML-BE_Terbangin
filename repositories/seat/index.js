const { Flights, Seats, Airlines, Airports } = require("../../models");
const { Sequelize } = require('sequelize');

exports.getSeats = async () => {
    const data = await Seats.findAll({
        include: {
            model: Flights,
            include: [
                {
                    model: Airlines,
                },
                { model: Airports, as: "StartAirport" },
                { model: Airports, as: "EndAirport" },
            ],
        },
    });
    return data;
};

exports.getSeatbyId = async (id) => {
    const data = await Seats.findAll({
        where: {
            id,
        },
        include: {
            model: Flights,
            include: [
                {
                    model: Airlines,
                },
                { model: Airports, as: "StartAirport" },
                { model: Airports, as: "EndAirport" },
            ],
        },
    });

    if (data.length) {
        return data;
    }
    return null;
};

exports.getSeatbyFlight = async (id) => {
    const data = await Seats.findAll({
        where: {
            flightId: id,
        },
        include: [Flights],
    });

    if (data.length) {
        return data;
    }
    return null;
};

exports.createSeat = async (payload) => {
    const data = await Seats.create(payload);
    return data;
};

exports.updateSeat = async (id, payload) => {
    await Seats.update(payload, {
        where: {
            id,
        },
    });

    const data = await Seats.findAll({
        where: {
            id,
        },
        include: {
            model: Flights,
            include: [
                {
                    model: Airlines,
                },
                { model: Airports, as: "StartAirport" },
                { model: Airports, as: "EndAirport" },
            ],
        },
    });

    return data;
};

exports.deleteSeat = async (id) => {
    // delete from postgres
    await Seats.destroy({ where: { id } });

    return null;
};

exports.deleteSeatbyFlight = async (id) => {
    // delete from postgres
    await Seats.destroy({ where: { flightId: id } });

    return null;
};

exports.avaibleFlightsBySeatsData = async () => {
    const data = await Seats.findAll({
        attributes: [
            'airlineClass',
            [Sequelize.fn('COUNT', Sequelize.col('Seats.airlineClass')), 'airlineClassCount'] // count airlineClass
        ],
        group: [
            'Seats.flightId', 'Seats.airlineClass'
        ],
        include: {
            model: Flights,
            attributes: ['id', 'departureAt', 'arrivalAt'],
            include: [
                {
                    model: Airlines,
                },
                { 
                    model: Airports, 
                    as: "StartAirport" ,
                    attributes: ['name', 'city', 'country']
                },
                { 
                    model: Airports, 
                    as: "EndAirport" ,
                    attributes: ['name', 'city', 'country']
                },
            ],
        },
        order: [
            [Flights, 'departureAt', 'ASC'], // Order by Flights departureAt
        ]
    });

    return data

}
