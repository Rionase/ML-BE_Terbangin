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

// Rekomendasi
exports.recommendation = async (user) => {
    if (!user) return [];

    const myBookingData = await helperBookingUsecase.getHelperBookingByUserId(user.id, "", 10);
    if (myBookingData.length === 0) return [];

    const myFormattedBookingData = formatData(myBookingData);
    const allBookingData = await getOtherData(user.id);

    // Buat matriks interaksi
    const interactionMatrix = {};
    const allFlightIds = new Set();

    allBookingData.forEach(item => {
        const userId = item.userId;
        interactionMatrix[userId] = {};

        item.bookingData.forEach(booking => {
            const flightId = booking.flightId;
            allFlightIds.add(flightId);

            let point = 0;
            if (booking.flightId === myFormattedBookingData[0].flightId) point++;
            if (booking.airlineName === myFormattedBookingData[0].airlineName) point++;
            if (booking.departure.city === myFormattedBookingData[0].departure.city && booking.departure.country === myFormattedBookingData[0].departure.country) point++;
            if (booking.arrival.city === myFormattedBookingData[0].arrival.city && booking.arrival.country === myFormattedBookingData[0].arrival.country) point++;
            if (isSameDay(booking.departure.time, myFormattedBookingData[0].departure.time)) point++;
            if (Math.abs(booking.price - myFormattedBookingData[0].price) < 500000) point++;

            interactionMatrix[userId][flightId] = point;
        });
    });

    // Tambahkan data pengguna sendiri
    interactionMatrix[user.id] = {};
    myFormattedBookingData.forEach(booking => {
        interactionMatrix[user.id][booking.flightId] = 1; // Asumsi poin 1 untuk pengguna sendiri
    });

    // Hitung cosine similarity
    const similarityMatrix = computeCosineSimilarity(interactionMatrix);

    // Prediksi preferensi
    const recommendations = {};
    [...allFlightIds].forEach(flightId => {
        if (!interactionMatrix[user.id][flightId]) {
            const score = predictPreference(user.id, flightId, similarityMatrix, interactionMatrix);
            recommendations[flightId] = score;
        }
    });

    // Urutkan rekomendasi berdasarkan skor prediksi
    return Object.entries(recommendations).sort(([, a], [, b]) => b - a).map(([key]) => key);
};

// Hitung Cosine Similarity
const computeCosineSimilarity = (matrix) => {
    const similarityMatrix = {};
    const keys = Object.keys(matrix);

    for (let userA of keys) {
        similarityMatrix[userA] = {};
        for (let userB of keys) {
            if (userA === userB) {
                similarityMatrix[userA][userB] = 1;
                continue;
            }

            // Hitung cosine similarity
            const vecA = matrix[userA];
            const vecB = matrix[userB];
            const dotProduct = vecA.reduce((sum, val, idx) => sum + val * vecB[idx], 0);
            const normA = Math.sqrt(vecA.reduce((sum, val) => sum + val ** 2, 0));
            const normB = Math.sqrt(vecB.reduce((sum, val) => sum + val ** 2, 0));

            similarityMatrix[userA][userB] = dotProduct / (normA * normB || 1);
        }
    }

    return similarityMatrix;
};

// Prediksi preferensi
const predictPreference = (user, ticketId, similarityMatrix, interactionMatrix) => {
    const neighbors = Object.keys(similarityMatrix[user]).filter(
        neighbor => neighbor !== user && interactionMatrix[neighbor][ticketId] !== undefined
    );

    const numerator = neighbors.reduce((sum, neighbor) => {
        const sim = similarityMatrix[user][neighbor];
        const score = interactionMatrix[neighbor][ticketId];
        return sum + sim * score;
    }, 0);

    const denominator = neighbors.reduce((sum, neighbor) => sum + Math.abs(similarityMatrix[user][neighbor]), 0);

    return denominator ? numerator / denominator : 0;
};