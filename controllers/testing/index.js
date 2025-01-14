const flightUsecase = require("../../usecases/flight/index");
const seatUsecase = require("../../usecases/seat/index");

const { v4: uuidv4 } = require("uuid");
const recomendationHelper = require("../../helpers/recomendation")
const XLSX = require('xlsx');
const recomendationUsecase = require("../../usecases/recomendation/index.js")

exports.insertSeat = async (req,res,next) => {

    // GET FLIGHTS LIMIT NEED TO BE DISABLED TO GET ALL FLIGHTS
    const allFlights = await flightUsecase.getFlights();

    let total = allFlights.length
    let count = 0

    for ( let i = 0 ; i < allFlights.length ; i++ ) {
        data = allFlights[i]

        let economy = data["capacityEconomy"];
        let business = data["capacityBussines"];
        let firstClass = data["capacityFirstClass"]

        let flightId = data["id"];
        let isAvailable = 1;

        if ( data["StartAirport"]["country"] == "Indonesia" && data["EndAirport"]["country"] == "Indonesia" ) {

            let tmp = await seatUsecase.getSeatbyFlight(flightId)
            if ( tmp ) {
                continue
            } else {
                // ! RUNNING THE CODE AGAIN MAY MAKE THE DATA DUPLICATE

                // let airlineClass = "ECONOMY";
                // for (let iEconomy = 1 ; iEconomy <= economy ; iEconomy++ ) {
                //     let id = uuidv4();
                //     let seatNumber = iEconomy;
                //     await seatUsecase.createSeat({
                //         id,
                //         flightId,   
                //         seatNumber,
                //         airlineClass,
                //         isAvailable
                //     })
                // }

                // airlineClass = "BUSINESS"
                // for (let iBussiness = 1 ; iBussiness <= business ; iBussiness++ ) {
                //     let id = uuidv4();
                //     let seatNumber = iBussiness;
                //     await seatUsecase.createSeat({
                //         id,
                //         flightId,
                //         seatNumber,
                //         airlineClass,
                //         isAvailable
                //     })
                // }

                // airlineClass = "FIRST_CLASS"
                // for (let iFirst = 1 ; iFirst <= firstClass ; iFirst++ ) {
                //     let id = uuidv4();
                //     let seatNumber = iFirst;
                //     await seatUsecase.createSeat({
                //         id,
                //         flightId,
                //         seatNumber,
                //         airlineClass,
                //         isAvailable
                //     })
                // }

                count += 1
                console.log(`============== PROGRESS NUMBER ${count} / ${total} ====================`)
            }

        }
    }

    res.status(200).json({
        message: "berhasil",
    })
}

exports.getAvailableFlight = async (req,res,next) => {
    let data = await seatUsecase.avaibleFlightsBySeatsData()

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

    res.setHeader('Content-Disposition', 'attachment; filename="data.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    res.send(excelBuffer);
}

exports.recomendation = async (req,res,next) => {

    let page = req.query.page;
    
    if (!req.user) {
        let result = await recomendationUsecase.findDefaultRecomendation(page)
        return res.status(200).json({ data: result })
    }

    let allUserTicket = await recomendationUsecase.findAllUserTicket();
    let myId = req.user.id;
    let myEmail = req.user.email;
    let myTicket = allUserTicket[myId];
    
    // jika user tidak pernah membeli ticket
    if ( !myTicket ) {
        let result = await recomendationUsecase.findDefaultRecomendation(page)
        return res.status(200).json({ data: result })
    }
    
    let allTicket = await recomendationUsecase.findAllAvailableTicket();
    let allUser = await recomendationUsecase.findAllUser();
    
    let matriks_interaction = recomendationHelper.CalculateMatriksInteraction(allTicket, allUser, allUserTicket);

    let cosine_similarity = recomendationHelper.CalculateCosineSimilarity(myId, allUser, matriks_interaction);

    let prediction_preference = recomendationHelper.CalculatePredictionPreference(myId, allUser, allTicket, matriks_interaction, cosine_similarity);

    // const sortedRecomedationFlightId = Object.fromEntries(
    //     Object.entries(prediction_preference).sort((a, b) => b[1] - a[1])
    // );

    await recomendationHelper.exportAll(myEmail, allTicket, allUser, matriks_interaction, cosine_similarity, prediction_preference)

    let endResult = recomendationHelper.mergedAndSortEndResult(prediction_preference, allTicket)

    let limit = 8
    let startItem = ( page - 1 ) * limit;
    let endItem = startItem + limit;
    let slicedResult = endResult.slice(startItem, endItem)

    // res.status(200).json(allUserTicket)

    res.status(200).json({
        data: slicedResult
    })
}