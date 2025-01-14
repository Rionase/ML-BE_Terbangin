const ExcelJS = require("exceljs");

exports.CalculateMatriksInteraction = (allTicket, allUser, allUserTicket) => {
    let result = []

    allUser.forEach(user => {
        let currentUserTicket = allUserTicket[user.id];
        // jika user tidak memiliki history pembelian ticket
        if (!currentUserTicket) {
            currentUserTicket = [];
        }

        let matriks = []
        allTicket.forEach(ticket => {
            matriks.push(CalculateTicketSimilarity(ticket, currentUserTicket))
        });
        result.push(matriks)
    });
    return result

}

let CalculateTicketSimilarity = (ticketToCompare, userTicketHistory) => {
    let point = 0;
    userTicketHistory.forEach(item => {
        if ( item['flights_id'] == ticketToCompare['flights_id'] ) point++;
        if ( item['airline_id'] == ticketToCompare['airline_id'] ) point++;
        if ( item['departure_city'] == ticketToCompare['departure_city'] && item['departure_country'] == ticketToCompare['departure_country'] ) point++;
        if ( item['arrival_city'] == ticketToCompare['arrival_city'] && item['arrival_country'] == ticketToCompare['arrival_country'] ) point++;
        if ( item['departure_date'] == ticketToCompare['departure_date'] ) point++;
        if ( Math.abs(item['price'] - ticketToCompare['price']) <= 5000000 ) point++
    });
    return point
}

exports.CalculateCosineSimilarity = (myId, allUser, matriksInteraksi) => {
    let myUserIndex = allUser.findIndex(user => user.id == myId);
    let myMatriksInteraksi = matriksInteraksi[myUserIndex];

    let result = [];

    matriksInteraksi.forEach(item => {
        result.push(ConsineSimilarity(myMatriksInteraksi, item))
    });

    return result;
}

let ConsineSimilarity = (myMatriksInteraksi, otherMatriksInteraksi) => {
     // Check if both matrices have the same length
     if (myMatriksInteraksi.length !== otherMatriksInteraksi.length) {
        throw new Error("Both interaction matrices must have the same length.");
    }

    // Calculate the dot product: Σ(r_ai * r_bi)
    let dotProduct = 0;
    let magnitudeA = 0;
    let magnitudeB = 0;

    for (let i = 0; i < myMatriksInteraksi.length; i++) {
        const r_ai = myMatriksInteraksi[i];
        const r_bi = otherMatriksInteraksi[i];

        dotProduct += r_ai * r_bi; // Sum of products
        magnitudeA += r_ai ** 2;  // Sum of squares for U_a
        magnitudeB += r_bi ** 2;  // Sum of squares for U_b
    }

    // Calculate magnitudes: √Σ(r_ai^2) and √Σ(r_bi^2)
    magnitudeA = Math.sqrt(magnitudeA);
    magnitudeB = Math.sqrt(magnitudeB);

    // Handle edge case: if either magnitude is 0, similarity is 0
    if (magnitudeA === 0 || magnitudeB === 0) {
        return 0;
    }

    // Calculate Cosine Similarity: Sim(U_a, U_b) = dotProduct / (magnitudeA * magnitudeB)
    return dotProduct / (magnitudeA * magnitudeB);
}

exports.CalculatePredictionPreference = (myId, allUser, allTicket, matriksInteraksi, consineSimilarity) => {

    let result = [];

    let myUserIndex = allUser.findIndex(user => user.id == myId);

    let rataRataNilaiInteraksi = [];
    matriksInteraksi.forEach(item => {
        // rata rata = total nilai interaksi / jumlah nilai interaksi
        let total = item.reduce((a, b) => a + b, 0)
        rataRataNilaiInteraksi.push(total / item.length)
    });

    // total cosine similarity tanpa cosine similarity milik sendiri
    let totalCosine = consineSimilarity.reduce((a, b) => Math.abs(a) + Math.abs(b), 0) - Math.abs(consineSimilarity[myUserIndex]);
    
    allTicket.forEach((ticket, ticketIndex) => {
        let totalKontribusi = 0;
        allUser.forEach((user, userIndex) => {
            if (userIndex != myUserIndex) {
                let kontribusi = consineSimilarity[userIndex] * ( matriksInteraksi[userIndex][ticketIndex] - rataRataNilaiInteraksi[userIndex] );
                totalKontribusi += kontribusi;
            }
        });
        
        let hasil_pembagian = 0;
        if (totalCosine !== 0) {
            hasil_pembagian = totalKontribusi / totalCosine
        }
        let predictionPreference = rataRataNilaiInteraksi[myUserIndex] + (hasil_pembagian)
        result.push({
            flight_id: ticket.flights_id,
            flight_class: ticket.class,
            prediction_preference: predictionPreference
        })
    });

    return result;
}

let writeExcel = (worksheet, listHeaderX, listHeaderY, content) => {

    // Add X headers (column headers)
    worksheet.addRow(["", ...listHeaderX]); // Empty cell for the first column (Y headers)
    
    // Add content with Y headers
    listHeaderY.forEach((headerY, rowIndex) => {
        worksheet.addRow([headerY, ...content[rowIndex]]);
    });

    // Adjust column widths for better readability
    worksheet.columns = [
        { width: 20 }, // Y header column
        ...listHeaderX.map(() => ({ width: 20 })), // X header columns
    ];
}

// Will Export :
// Sheet 1: Matriks Interaksi
// Sheet 2: Cosine Similarity
// Sheet 3: Prediksi Preferensi
exports.exportAll = async (email, allTicket, allUser, matriksInteraksi, consineSimilarity, predictionPreference) => {

    let exportPath = 'export/' + email + ".xlsx";
    const workbook = new ExcelJS.Workbook();

    // sheet 1
    const worksheet1 = workbook.addWorksheet("Matriks Interaksi");

    let headerX_matriksInteraksi = allTicket.map(item => `${item.flight_code} - ${item.class}`);
    let headerY_matriksInteraksi = allUser.map(item => `${item.email}`);

    writeExcel(worksheet1, headerX_matriksInteraksi, headerY_matriksInteraksi, matriksInteraksi);
    
    // sheet 2
    const worksheet2 = workbook.addWorksheet("Cosine Similarity");
    let headerX_cosine = allUser.map(item => `${item.email}`);
    let headerY_cosine = [email];
    
    writeExcel(worksheet2, headerX_cosine, headerY_cosine, [consineSimilarity])

    // sheet 3
    const worksheet3 = workbook.addWorksheet("Prediction Preference");
    let headerX_preference = allTicket.map(item => `${item.flight_code} - ${item.class}`);
    let headerY_preference = [email];

    let predictionContent = SortPredictionPreferenceExcelData(predictionPreference, allTicket)
    
    writeExcel(worksheet3, headerX_preference, headerY_preference, [predictionContent])

     // Save the file
    await workbook.xlsx.writeFile(exportPath);
}

function SortPredictionPreferenceExcelData(predictionPreference, allTicket) {
    const mergedData = predictionPreference.map(preference => {
        const matchingTicket = allTicket.find(ticket => 
          ticket.flights_id === preference.flight_id && ticket.class === preference.flight_class
        );
    
        if (matchingTicket) {
            return {
                flight_id: preference.flight_id,
                flight_class: preference.flight_class,
                prediction_preference: preference.prediction_preference,
                flight_code: matchingTicket.flight_code,
                airline_name: matchingTicket.airline_name,
                departure_city: matchingTicket.departure_city,
                arrival_city: matchingTicket.arrival_city,
                departure_at: matchingTicket.departure_at,
                price: matchingTicket.price,
                departure_timezone: matchingTicket.departure_timezone,
                picture: matchingTicket.picture,
                departure_iataCode: matchingTicket.departure_iataCode,
                arrival_iataCode: matchingTicket.arrival_iataCode
            };
        }
    
        return null; // Return null if no matching ticket is found
      });
    
      return mergedData
        .filter(entry => entry !== null) // Remove null entries
        .map(entry => entry.prediction_preference); 
}

exports.mergedAndSortEndResult = (predictionPreference, allTicket) => {
    const mergedData = predictionPreference.map(preference => {
        const matchingTicket = allTicket.find(ticket => 
          ticket.flights_id === preference.flight_id && ticket.class === preference.flight_class
        );
    
        if (matchingTicket) {
            return {
                id: preference.flight_id,
                flight_class: preference.flight_class,
                prediction_preference: preference.prediction_preference,
                flight_code: matchingTicket.flight_code,
                airline_name: matchingTicket.airline_name,
                departure_city: matchingTicket.departure_city,
                arrival_city: matchingTicket.arrival_city,
                departure_date: matchingTicket.departure_date,
                departure_time: matchingTicket.departure_time,
                price: matchingTicket.price,
                departure_timezone: matchingTicket.departure_timezone,
                picture: matchingTicket.picture,
                departure_iataCode: matchingTicket.departure_iataCode,
                arrival_iataCode: matchingTicket.arrival_iataCode
            };

            // return {
            //     id: preference.flight_id,
            //     StartAirport: {
            //         city: matchingTicket.departure_city,
            //         iataCode: matchingTicket.departure_iataCode,
            //     }
            // }
        }
    
        return null; // Return null if no matching ticket is found
      });
    
      // Filter out null values (in case of unmatched entries)
      const filteredData = mergedData.filter(entry => entry !== null);
    
      // Sort by prediction_preference DESC, departure_date ASC, price DESC
      filteredData.sort((a, b) => {
        if (b.prediction_preference !== a.prediction_preference) {
          return b.prediction_preference - a.prediction_preference; // DESC for prediction_preference
        }
        if (a.departure_time.getTime() !== b.departure_time.getTime()) {
          return a.departure_time - b.departure_time; // ASC for departure_date
        }
        return b.price - a.price; // DESC for price
      });
    
      return filteredData;
}