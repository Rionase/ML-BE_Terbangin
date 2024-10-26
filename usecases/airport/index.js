const airportRepo = require("../../repositories/airport");

exports.getAirports = async () => {
  const data = await airportRepo.getAirports();
  return data;
};

exports.getAirport = async (id) => {
  const data = await airportRepo.getAirport(id);
  return data;
};

exports.createAirport = async (payload) => {
  const data = await airportRepo.createAirport(payload);
  return data;
};

exports.updateAirport = async (id, payload) => {
  const data = await airportRepo.updateAirport(id, payload);
  await airportRepo.getAirport(id);
  return data;
};

exports.deleteAirport = async (id) => {
  const data = await airportRepo.deleteAirport(id);
  return data;
};
