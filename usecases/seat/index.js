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
