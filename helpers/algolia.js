const algoliasearch = require("algoliasearch");
const { getAirports } = require("../repositories/airport");

const client = algoliasearch(
    process.env.ALGOLIA_APP_ID,
    process.env.ALGOLIA_API_KEY
);
const indexAirports = client.initIndex("airports");

exports.syncAirportsToAlgolia = async () => {
    try {
        const airports = await getAirports();
        const objects = airports.map((airport) => ({
            objectID: airport.id,
            ...airport,
        }));
        return await indexAirports.saveObjects(objects);
    } catch (error) {
        console.error("Error syncing airports to Algolia:", error);
    }
};
