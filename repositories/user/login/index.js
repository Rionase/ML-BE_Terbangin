const axios = require("axios");

const { error } = require("console");

exports.getGoogleAccessTokenData = async (accessToken) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Invalid Token");
  }
};
