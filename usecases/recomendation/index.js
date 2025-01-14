const recomendationRepo = require("../../repositories/recomendation/index.js");

exports.findAllUserTicket = async () => {
    let allUserTicket = await recomendationRepo.findAllUserTicket();
    // group By by user id
    return allUserTicket.reduce((acc, item) => {
        let date = new Date(item['departure_time'])
        let departure_date = date.toISOString().slice(0, 10)
        item['departure_date'] = departure_date;
        if (!acc[item.user_id]) {
            acc[item.user_id] = [];
        }
        acc[item.user_id].push(item);
        return acc;
    }, {});
}

exports.findAllAvailableTicket = async () => {
    let allAvailableTicket = await recomendationRepo.findAllAvailableTicket();

    let result = [];
    allAvailableTicket.forEach(item => {
        let date = new Date(item['departure_time'])
        let departure_date = date.toISOString().slice(0, 10);

        let flight_param = {
            flights_id: item.flights_id,
            flight_code: item.flight_code,
            airline_id: item.airline_id,
            airline_name: item.airline_name,
            departure_city: item.departure_city,
            departure_country: item.departure_country,
            arrival_city: item.arrival_city,
            arrival_country: item.arrival_country,
            departure_time: item.departure_time,
            departure_date: departure_date,
            departure_iataCode: item.departure_iataCode,
            arrival_iataCode: item.arrival_iataCode,
            picture: item.picture,
            departure_timezone: item.departure_timezone
        };

        // ECONOMY
        if (item.economy_capacity > 0) {
            result.push({
                ...flight_param,
                class: 'ECONOMY',
                price: item.economy_price
            })
        }

        // BUSINESS
        if (item.bussines_capacity > 0) {
            result.push({
                ...flight_param,
                class: 'BUSINESS',
                price: item.bussines_price
            })
        }

        //FIRST CLASS
        if (item.first_class_capacity > 0) {
            result.push({
                ...flight_param,
                class: 'FIRST_CLASS',
                price: item.first_class_price
            })
        }
    });

    return result;
}

exports.findAllUser = async () => {
    let allUser = await recomendationRepo.findAllUser();
    return allUser;
}

exports.findDefaultRecomendation = async (page) => {
    
    let result = [];
    
    let allAvailableTicket = await recomendationRepo.findAllAvailableTicket();
    allAvailableTicket.forEach(item => {
        let date = new Date(item['departure_time'])
        let departure_date = date.toISOString().slice(0, 10);
        
        let flight_param = {
            id: item.flights_id,
            flight_code: item.flight_code,
            airline_id: item.airline_id,
            airline_name: item.airline_name,
            departure_city: item.departure_city,
            departure_country: item.departure_country,
            arrival_city: item.arrival_city,
            arrival_country: item.arrival_country,
            departure_time: item.departure_time,
            departure_date: departure_date,
            departure_iataCode: item.departure_iataCode,
            arrival_iataCode: item.arrival_iataCode,
            picture: item.picture,
            departure_timezone: item.departure_timezone
        };
        
        // ECONOMY
        if (item.economy_capacity > 0) {
            result.push({
                ...flight_param,
                flight_class: 'ECONOMY',
                price: item.economy_price
            })
        }
        
        // BUSINESS
        if (item.bussines_capacity > 0) {
            result.push({
                ...flight_param,
                flight_class: 'BUSINESS',
                price: item.bussines_price
            })
        }
        
        //FIRST CLASS
        if (item.first_class_capacity > 0) {
            result.push({
                ...flight_param,
                flight_class: 'FIRST_CLASS',
                price: item.first_class_price
            })
        }
    });
    
    result.sort((a, b) => {
        const timeComparison = new Date(a.departure_time) - new Date(b.departure_time);
        if (timeComparison !== 0) {
            return timeComparison; // Sort by departure_time if not equal
        }
        return a.price - b.price; // Sort by price if departure_time is equal
    });
    
    let limit = 8
    let startItem = ( page - 1 ) * limit;
    let endItem = startItem + limit;

    return result.slice(startItem, endItem);

}