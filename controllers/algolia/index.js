const syncToAlgolia = require("../../helpers/algolia");

exports.syncAirports = async (req, res, next) => {
    try {
        const result = await syncToAlgolia.syncAirportsToAlgolia();

        if (!result) {
            throw {
                statusCode: 500,
                message: "Error syncing airports to Algolia",
            };
        }
        res.status(200).json({
            message: "Airports synced to Algolia successfully",
        });
    } catch (error) {
        next(error);
    }
};
