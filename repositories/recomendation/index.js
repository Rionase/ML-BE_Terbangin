const db = require("../../models/index");

const sequelize = db.sequelize;

exports.findAllUserTicket = async () => {
    let [ allUserTicket ] = await sequelize.query(`
        SELECT 
            users.id AS user_id, users.email AS user_email, 
            flights.id as flights_id, flights.flightCode AS flight_code,
            airlines.id as airline_id, airlines.name AS airline_name, 
            departure_airport.city AS departure_city, departure_airport.country AS departure_country,
            arrival_airport.city AS arrival_city, arrival_airport.country AS arrival_country,
            flights.departureAt AS departure_time,
            seats.airlineClass AS airline_class, 
            CASE seats.airlineClass 
                WHEN "ECONOMY" THEN flights.priceEconomy
                WHEN "BUSINESS" THEN flights.priceBussines
                WHEN "FIRST_CLASS" THEN flights.priceFirstClass
            END AS price
        FROM helperbookings
        INNER JOIN bookings on bookings.id = helperbookings.bookingId
        INNER JOIN users ON users.id = bookings.userId
        INNER JOIN seats ON seats.id = helperbookings.seatId
        INNER JOIN flights ON flights.id = seats.flightId
        INNER JOIN airlines ON airlines.id = flights.airlineId
        INNER JOIN airports AS departure_airport ON departure_airport.id = flights.startAirportId
        INNER JOIN airports AS arrival_airport ON arrival_airport.id = flights.endAirportId
        ORDER BY helperbookings.id DESC
        LIMIT 1000
    `)
    return allUserTicket;
}

exports.findAllUser = async () => {
    let [ allUser ] = await sequelize.query(`
        SELECT flights.id, flights.email FROM users
    `);
    return allUser;
}

exports.findAllAvailableTicket = async (limit, offset) => {
    let [ allTicket ] = await sequelize.query(`
        SELECT
            flights.id as flights_id, flights.flightCode AS flight_code,
            airlines.id as airline_id, airlines.name AS airline_name, 
            departure_airport.city AS departure_city, departure_airport.country AS departure_country,
            arrival_airport.city AS arrival_city, arrival_airport.country AS arrival_country,
            flights.departureAt AS departure_time,
            flights.capacityEconomy AS economy_capacity, flights.priceEconomy AS economy_price,
            flights.capacityBussines AS bussines_capacity, flights.priceBussines AS bussines_price,
            flights.capacityFirstClass AS first_class_capacity, flights.priceFirstClass AS first_class_price,
            departure_airport.iataCode AS departure_iataCode,
            arrival_airport.iataCode AS arrival_iataCode,
            arrival_airport.picture AS picture,
            departure_airport.timezone AS departure_timezone
        FROM flights
        INNER JOIN airlines ON airlines.id = flights.airlineId
        INNER JOIN airports AS departure_airport ON departure_airport.id = flights.startAirportId
        INNER JOIN airports AS arrival_airport ON arrival_airport.id = flights.endAirportId
        WHERE (flights.capacityEconomy > 0 OR flights.capacityBussines > 0 OR flights.capacityFirstClass > 0)
        AND flights.departureAt >= NOW()
        ORDER BY flights.id DESC
        LIMIT 1000
    `);

    return allTicket;
}

exports.findAllUser = async () => {
    let [ allUser ] = await sequelize.query(`
        SELECT users.id, users.email FROM users
    `)

    return allUser
}