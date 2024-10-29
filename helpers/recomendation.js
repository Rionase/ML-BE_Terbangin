const helperBookingUsecase = require("../usecases/helperBooking");
const authUsecase = require("../usecases/auth")
const fs = require('fs');
const path = require('path');

let formatData = (data) => {

    let formattedData = []

    data.forEach(item => {
        let flightId = item['Seat']['flightId'];
        let airlineClass = item['Seat']['airlineClass'];
        let price = 0;

        if ( airlineClass == "ECONOMY" ) {
            price = item['Seat']['Flight']['priceEconomy']
        } else if ( airlineClass == "BUSINESS" ) {
            price = item['Seat']['Flight']['priceBussines']
        } else if ( airlineClass == "FIRST_CLASS" ) {
            price = item['Seat']['Flight']['priceFirstClass']
        }

        let airlineName = item['Seat']['Flight']['Airline']['name']
        let airlineType = item['Seat']['Flight']['Airline']['aircraftType']

        let departureTime = item['Seat']['Flight']['departureAt']
        let departureAirport = item['Seat']['Flight']['StartAirport']['name']
        let departureCity = item['Seat']['Flight']['StartAirport']['city']
        let departureCountry = item['Seat']['Flight']['StartAirport']['country']

        let arrivalTime = item['Seat']['Flight']['arrivalAt']
        let arrivalAirport = item['Seat']['Flight']['EndAirport']['name']
        let arrivalCity = item['Seat']['Flight']['EndAirport']['city']
        let arrivalCountry = item['Seat']['Flight']['EndAirport']['country']

        formattedData.push({
            flightId: flightId,
            class: airlineClass,
            price: price,
            airlineName: airlineName,
            airlineType: airlineType,
            departure: {
                time: departureTime,
                airportName: departureAirport,
                city: departureCity,
                country: departureCountry
            },
            arrival: {
                time: arrivalTime,
                airportName: arrivalAirport,
                city: arrivalCity,
                country: arrivalCountry
            }
        })
    })

    return formattedData;
}

let getOtherData = async (myId) => {
    let allFormatedBookingData = []

    let allUserId = await authUsecase.getAllUserIdButNotMyself(myId)

    for ( let item of allUserId ) {
        let userBookingData = await helperBookingUsecase.getHelperBookingByUserId(item['id'], "", 10)
        let formattedUserData = formatData(userBookingData)
        
        allFormatedBookingData.push({
            userId: item['id'],
            email: item['email'],
            bookingData: formattedUserData
        })
    }

    return allFormatedBookingData
}

function isSameDay(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return d1.toISOString().slice(0, 10) === d2.toISOString().slice(0, 10);
}

function writeLogData(userEmail, data) {

    const sortedData = Object.fromEntries(
        Object.entries(data).sort(([, a], [, b]) => b.point - a.point)
    );

    // Ensure log directory exists
    const logDir = 'log';
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }

    // Construct file path based on user Email
    const filePath = path.join(logDir, `${userEmail}.json`);
    
    // Convert data to JSON with 4-space indentation
    const jsonData = JSON.stringify(sortedData, null, 4);
    
    // Write data to the file
    fs.writeFileSync(filePath, jsonData, 'utf-8');
}

function sortMapData(data) {
    // Convert to array of [key, value] pairs and sort by value in descending order
    const sortedKeys = Object.entries(data)
    .sort(([, a], [, b]) => b - a)
    .map(([key]) => key);

    return sortedKeys
}

exports.recomendation = async (user) => {

    // IF USER IS NOT LOGIN
    if (!user) {
        return []
    }
    
    let myBookingData = await helperBookingUsecase.getHelperBookingByUserId(user.id, "", 10)

    // IF USER DIDN'T BOOK ANY TICKET YET, THEN RETURN EMPTY RECOMENDATION FLIGHT ID
    if ( myBookingData.length == 0 ) {
        return []
    }

    let myFormatedBookingData = formatData(myBookingData)

    let allBookingData = await getOtherData(user.id)

    let recomendationMap = {}
    let recomendationLog = {}

    allBookingData.forEach(item => {
        for ( let otherData of item.bookingData ) {
            for ( let myData of myFormatedBookingData ) {

                let tmpPoint = 0
                let tmpLogText = `${myData["departure"]["time"]} | ${myData['airlineName']} | ${myData["departure"]["city"]} - ${myData["arrival"]["city"]} | `

                // IF BOTH FLIGHT SAME, THEN +1
                if ( otherData["flightId"] === myData["flightId"] ) {
                    tmpPoint += 1
                    tmpLogText += "+1 FROM SAME FLIGHT, "
                }

                // IF BOTH SAME AIRLINE, THEN +1
                if ( otherData['airlineName'] == myData['airlineName'] ) {
                    tmpPoint += 1
                    tmpLogText += "+1 FROM SAME AIRLINE, "
                }

                // IF BOTH DEPARTURE CITY AND COUNTRY THE SAME, THEN + 1
                if ( otherData["departure"]["city"] == myData["departure"]["city"] && otherData["departure"]["country"] == myData["departure"]["country"] ) {
                    tmpPoint += 1
                    tmpLogText += "+1 FROM SAME DEPARTURE COUNTRY AND CITY, "
                }

                // IF BOTH ARRIVAL CITY AND COUNTRY THE SAME, THEN + 1
                if ( otherData["arrival"]["city"] == myData["arrival"]["city"] && otherData["arrival"]["country"] == myData["arrival"]["country"] ) {
                    tmpPoint += 1
                    tmpLogText += "+1 FROM SAME ARRIVAL COUNTRY AND CITY, "
                }

                // IF BOTH ARE THE SAME DAY, THEN +1
                if ( isSameDay(otherData["departure"]["time"], myData["departure"]["time"]) ) {
                    tmpPoint += 1
                    tmpLogText += "+1 FROM SAME DAY, "
                }

                // IF THE DIFFERENCE NOT MORE THAN 500.000, THEN +1
                if ( Math.abs(otherData["price"] - myData["price"]) < 500000 ) {
                    tmpPoint += 1
                    tmpLogText += "+1 FROM SAME PRICE RANGE"
                }

                // CHECK IF FLIGHT ID IS IN RECOMENDATION MAP
                if ( otherData["flightId"] in recomendationMap ) {
                    recomendationMap[otherData["flightId"]] += tmpPoint
                } else {
                    recomendationMap[otherData["flightId"]] = tmpPoint
                    recomendationLog[otherData["flightId"]] = {
                        "flight": `${otherData["departure"]["time"]} | ${otherData['airlineName']} | ${otherData["departure"]["city"]} - ${otherData["arrival"]["city"]}`,
                        "user": {},
                        "point": 0,
                        "log": [],
                    }
                }

                // WRITE LOG
                if ( tmpPoint == 0 ) {
                    tmpLogText += "DOESN'T HAVE ANY SIMILARITY"
                }

                recomendationLog[otherData["flightId"]]["log"].push(tmpLogText)
                recomendationLog[otherData["flightId"]]['user'][item['email']] = true
                recomendationLog[otherData["flightId"]]["point"] += tmpPoint

            }
        }
    });

    let sortedData = sortMapData(recomendationMap)

    writeLogData(user.email, recomendationLog)

    return sortedData
    
}