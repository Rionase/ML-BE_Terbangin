const flightUsecase = require("../../usecases/flight/index");
const seatUsecase = require("../../usecases/seat/index");

const { v4: uuidv4 } = require("uuid");
const { recomendation } = require("../../helpers/recomendation")

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