const axios = require("axios");
const twilio = require("twilio");

const sendSMSV1 = async (phoneNumber, otp) => {
    const authToken = process.env.INFOBIP_AUTH_TOKEN;
    const sender = process.env.INFOBIP_SENDER;

    const postData = {
        messages: [
            {
                from: sender,
                destinations: [{ to: phoneNumber }],
                text: `Your OTP is: ${otp}. Valid for 10 minutes.`,
            },
        ],
    };

    await axios.post(process.env.INFOBIP_API_URL, postData, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `App ${authToken}`,
        },
    });

    return true;
};

const sendSMSV2 = async (phoneNumber, otp) => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);

    await client.messages.create({
        body: `Your OTP is: ${otp}. Valid for 10 minutes.`,
        to: phoneNumber,
        from: process.env.TWILIO_PHONE_NUMBER,
    });

    return true;
};

module.exports = {
    sendSMSV1,
    sendSMSV2,
};
