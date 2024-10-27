const seatRepo = require("../../repositories/seat/index");

exports.getSeats = async () => {
  const data = await seatRepo.getSeats();
  return data;
};

exports.getSeatbyId = async (id) => {
  const data = await seatRepo.getSeatbyId(id);
  return data;
};

exports.getSeatbyFlight = async (id) => {
  const data = await seatRepo.getSeatbyFlight(id);
  return data;
};

exports.createSeat = async (payload) => {
  const data = await seatRepo.createSeat(payload);
  return data;
};

exports.updateSeat = async (id, payload) => {
  const data = await seatRepo.updateSeat(id, payload);
  return data;
};

exports.deleteSeat = async (id) => {
  const data = await seatRepo.deleteSeat(id);
  return data;
};
exports.deleteSeatbyFlight = async (id) => {
  const data = await seatRepo.deleteSeatbyFlight(id);
  return data;
};

exports.avaibleFlightsBySeatsData = async () => {
  const data = await seatRepo.avaibleFlightsBySeatsData();
  const FormattedData = []

  data.forEach(item => {
    let departureTime = new Date(item['Flight']['departureAt'])
    let formattedDepartureTime = departureTime.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });

    let arrivalTime = new Date(item['Flight']['arrivalAt'])
    let formattedArrivalTime = arrivalTime.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });

    FormattedData.push({
      flight_id: item['Flight']['id'],
      class: item['airlineClass'],

      departure_at: formattedDepartureTime,
      departure_airport_city: item['Flight']['StartAirport']['city'],
      departure_airport_country: item['Flight']['StartAirport']['country'],
      departure_airport_name: item['Flight']['StartAirport']['name'],


      arrival_at: formattedArrivalTime,
      arrival_airport_city: item['Flight']['EndAirport']['city'],
      arrival_airport_country: item['Flight']['EndAirport']['country'],
      arrival_airport_name:  item['Flight']['EndAirport']['name'],

      airlines_name: item['Flight']['Airline']['name'],
      seats_available: item['airlineClassCount'],
    })
  });

  return FormattedData
}